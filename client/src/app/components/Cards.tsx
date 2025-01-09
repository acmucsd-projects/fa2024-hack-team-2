"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Swipeable from "./Swipeable";
import NavBar from "./NavBar";
import likedIcon from "/public/images/heart-solid.svg";
import interestIcon from "/public/images/thumbs-up-solid.svg";
import disinterestIcon from "/public/images/thumbs-down-solid.svg";
import backendConnection from "../../communication";

const getRandomRotation = () => {
  const positiveOrNegative = Math.random() < 0.5 ? 1 : -1;
  return positiveOrNegative * (Math.random() * 10 + 5); // Range: 5 to 15
};

const getRandomOpacity = () => Math.random() * 0.6 + 0.2; // Range: 0.2 to 0.8

interface Post {
  author: string;
  available_stores: string[]; // remove later?
  cost: number;
  date_created: string;
  images: string[];
  likes: 10;
  likesList: string[];
  product_details: string;
  tags: string[];
  title: string;
  _id: string;

}

interface MyComponentProps {}

const Cards: React.FC<MyComponentProps> = ({}) => {

  const [cards, setCards] = useState<any[]>([]);
  const [authorPFP, setAuthorPFP] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  const postIdRef = useRef<string>("");
  const [cardDetails, setCardDetails] = useState<{
    title: string;
    description: string;
    stores: string;
    likeCount: Number;
    material?: string;
    brand?: string;
    cost?: number;
  } | null>(null);
  const [availableStores, setAvailableStores] = useState<
    {
      location: string;
      address: string;
      status: string;
      image: string;
      link: string;
    }[]
  >([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [opacities, setOpacities] = useState<number[]>([]);

  // get post from BE
  const fetchData = async () => {    
    const response = await backendConnection.get("/users/feed");
    console.log(response.data);
    return response.data;
  };

  // Fetch data after interest/disinterest buttons are cålicked
  const nextPost = async (liked: boolean, initial=false) => {
    if (!initial && postIdRef.current) {
      console.log("PATCH", `/posts/${liked ? "like" : "dislike"}`);
      console.log("POST ID: ", postIdRef.current);
      const response = await backendConnection.patch(`/posts/${liked ? "like" : "dislike"}`, {
        post_id: postIdRef.current,
      });
    }

    const data:Post = await fetchData();
    setPostId(data._id);
    postIdRef.current = data._id; 
    setCards(data.images);
    // NOTE: image has 3 properties: contentType, data, _id
    setCardDetails({
      title: data.title,
      description: data.product_details,
      stores: data.available_stores,
      likeCount: data.likes,
      material: data.material || "",
      brand: data.brand || "",
      cost: data.cost || 0
    }
    );

    // TODO: 
    // get the author from the BE
    // set the author's pfp to the picture
    // const response = await backendConnection.get("/users", 
    //   {params: {user_id: data.author}}
    // );
    // console.log(response);

    // setAuthorPFP(response.data["picture"]);

    const newRotations = data.images.slice(1).map(() => getRandomRotation());
    const newOpacities = data.images.slice(1).map(() => getRandomOpacity());
    setRotations(newRotations);
    setOpacities(newOpacities);
  };

  // Initial fetch
  useEffect(() => {
    nextPost(false, true);
  }, []);

  return (
    <div className="mb-8 flex flex-1 flex-col items-center justify-center gap-0 lg:flex-row lg:items-center lg:justify-center">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center lg:w-[40%]">
        {/* Cards */}
        <Swipeable
          closeDirection="left"
          onSwipeComplete={() => nextPost(false)}
          className="relative flex h-[28rem] w-[20rem] items-center justify-center lg:h-[34rem] lg:w-[24rem]"
        >
          <Swipeable
            closeDirection="right"
            onSwipeComplete={() => nextPost(true)}
            className="relative flex h-[28rem] w-[20rem] items-center justify-center lg:h-[34rem] lg:w-[24rem]"
          >
            <div className="relative flex h-[28rem] w-[20rem] items-center justify-center lg:h-[34rem] lg:w-[24rem]">
              {/* Other cards */}
              {cards && cards.length > 1 && cards.slice(1).map((card, index) => (
                <img
                  key={index}
                  src={"data:image/png;base64," + card.data}
                  alt="Card"
                  className="absolute rounded-lg bg-gray-300 object-cover shadow-lg h-full w-full"
                  style={{
                    transform: `rotate(${rotations[index] || 0}deg)`,
                    opacity: opacities[index] || 1,
                    zIndex: index,
                  }}
                />
              ))}
              {/* Main card */}
              {cards && cards.length > 0 && (
                <div
                  className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100 shadow-xl"
                  style={{
                    zIndex: cards.length,
                  }}
                  onClick={() => setCards([...cards.slice(1), cards[0]])}
                >
                  <img
                    src={"data:image/png;base64," + cards[0].data}
                    alt="Main Card"
                    // width={6400}
                    // height={9600}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 z-50 rounded-full bg-gray-50 shadow-lg">
                    <Link href="/">
                      <Image
                        src={authorPFP}
                        width={30}
                        height={30}
                        alt="Author"
                        className="m-0.5 rounded-full opacity-30"
                      />
                    </Link>
                  </span>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black pb-4 pt-6">
                    <p className="mx-4 mt-4 text-lg font-bold text-white">
                      {cardDetails?.title}
                    </p>
                    <p className="mx-4 mt-0 text-sm text-white">
                      {cardDetails?.stores}
                    </p>
                    <span className="absolute bottom-2 right-4 text-center">
                      <Image
                        src={likedIcon}
                        width={30}
                        height={30}
                        alt="Like Button"
                        className="invert"
                      />
                      <p className="text-white">
                        {cardDetails?.likeCount.toString()}
                      </p>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Swipeable>
        </Swipeable>
        {/* Swipe Buttons */}
        <div className="relative flex space-x-4 mt-4">
          <div className="mr-8 mt-2 h-16 w-16 transition hover:scale-110 active:opacity-90">
            <Image
              src={disinterestIcon}
              width={80}
              height={80}
              alt="Uninterested"
              className="opacity-40"
              onClick={() => nextPost(false)}
            />
          </div>
          <div className="h-16 w-16 scale-x-[-1] transition hover:scale-x-[-1.1] hover:scale-y-110 active:opacity-90">
            <Image
              src={interestIcon}
              width={80}
              height={80}
              alt="Interested"
              className="opacity-20"
              onClick={() => nextPost(true)}
            />
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="m-4 flex w-full flex-col items-center overflow-y-auto p-4 lg:m-0 lg:max-w-lg">
        {/* Description */}
        <div className="mb-4 w-full rounded bg-white p-4 outline outline-gray-300">
          <p className="mb-4 text-center text-3xl font-bold lg:text-left">
            {cardDetails?.title}
          </p>
          <p className="mb-4 text-center lg:text-left">
            {cardDetails?.description}
          </p>
          {cardDetails?.material && (
            <>
              <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
                Material
              </p>
              <p className="mb-4">{cardDetails.material}</p>
            </>
          )}
          {cardDetails?.brand && (
            <>
              <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
                Brand
              </p>
              <p className="mb-4">{cardDetails.brand}</p>
            </>
          )}
          {cardDetails?.cost && (
            <>
              <p className="mt-4 border-t border-t-gray-300 pt-2 text-xl font-bold">
                Cost
              </p>
              <p>{cardDetails.cost}</p>
            </>
          )}
        </div>
        {/* Available Stores */}
        <div className="max-h-56 w-full overflow-y-scroll rounded bg-white p-4 outline outline-gray-300 lg:max-h-48 mb-[5.5rem]">
          <p className="mb-4 text-3xl font-bold">Trendings</p>
          {/* {availableStores.map((store, index) => (
            <Link href={store.link} key={index}>
              <span className="mt-2 flex w-full gap-2 rounded bg-white outline outline-gray-300">
                <Image
                  src={store.image}
                  width={50}
                  height={50}
                  alt="Location"
                  className="m-2"
                />
                <span className="relative my-2 flex-1">
                  <p className="text-lg font-bold">{store.location}</p>
                  <p className="text-sm text-gray-600">{store.address}</p>
                  <span
                    className={`h-[12px] w-[12px] rounded-full ${
                      store.status === "Available"
                        ? "bg-green-300"
                        : "bg-red-300"
                    } absolute right-2 top-1 drop-shadow`}
                  ></span>
                </span>
              </span>
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
