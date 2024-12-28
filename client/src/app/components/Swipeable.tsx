// Modified code from tonyqiu123 (GitHub)
// https://github.com/tonyqiu123/50-days-of-components/tree/main/frontend/src/components/Swipeable

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  HTMLAttributes,
} from "react";

type SwipeableProps = {
  onSwipeComplete?: () => void; // Function to run once swiped
  onTap?: () => void; // Function to run when swipe is not enough
  closeDirection?: "up" | "down" | "left" | "right";
  closeTravel?: number;
  children: React.ReactNode;
  transition?: string;
  [key: string]: any; // Allow additional props without warning
} & HTMLAttributes<HTMLElement>;

const Swipeable: React.FC<SwipeableProps> = ({
  onSwipeComplete,
  onTap,
  closeDirection = "right",
  closeTravel = 150,
  children,
  transition = "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
  ...props
}) => {
  const transformToHide = `translate${closeDirection === "up" || closeDirection === "down" ? "Y" : "X"}(${closeDirection === "up" || closeDirection === "left" ? "-" : ""}${closeTravel}px)`;

  const [isSwiped, setSwiped] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState(transition);
  const [transform, setTransform] = useState("");
  const modalRef = useRef<any>();

  let dragging = false;
  let mouseDownClientY = 0;
  let mouseDownClientX = 0;
  let dragTravel = 0;

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const interactiveElements = ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"];
    if (
      interactiveElements.includes(target.tagName) ||
      target.isContentEditable
    ) {
      return;
    }

    event.preventDefault();
    dragging = true;
    mouseDownClientY = event.clientY;
    mouseDownClientX = event.clientX;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    setTransitionStyle("");
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        switch (closeDirection) {
          case "up":
            dragTravel = mouseDownClientY - event.clientY;
            break;
          case "down":
            dragTravel = event.clientY - mouseDownClientY;
            break;
          case "left":
            dragTravel = mouseDownClientX - event.clientX;
            break;
          default:
            dragTravel = event.clientX - mouseDownClientX;
        }
        if (dragTravel >= 0) {
          setTransform(
            `translate${closeDirection === "up" || closeDirection === "down" ? "Y" : "X"}(${closeDirection === "up" || closeDirection === "left" ? "-" : ""}${dragTravel}px)`,
          );
        }
      }
    },
    [closeDirection],
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    setTransitionStyle(transition);
    dragging = false;
    if (dragTravel > closeTravel) {
      setSwiped(true);
      setTransform(transformToHide);
      if (onSwipeComplete) {
        onSwipeComplete(); // Trigger the provided function
      }
      // Return to the original position after swipe completion
      setTimeout(() => {
        setSwiped(false);
        setTransform("");
      }, 500); // Adjust the delay to match the transition duration
    } else {
      setTransform("");
      if (onTap) {
        onTap(); // Trigger the provided function for tap
      }
    }
    dragTravel = 0;
  }, [closeTravel, transformToHide, transition, onSwipeComplete, onTap]);

  useEffect(() => {
    if (!isSwiped) {
      setTransform(transformToHide);
      // Simulate a click event to trigger initial animation back to original position
      setTimeout(() => {
        setTransform("");
      }, 0);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSwiped, transformToHide, handleMouseMove, handleMouseUp]);

  return (
    <div
      {...props}
      ref={modalRef}
      className={`swipeable ${props.className ? props.className : ""} ${closeDirection}`}
      onMouseDown={handleMouseDown}
      style={{
        position: "relative",
        transition: transitionStyle,
        transform: transform,
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default Swipeable;
