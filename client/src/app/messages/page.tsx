import styles from "./messages.module.css";
import RecentMessages from "./RecentMessages";
import Chatlog from "./Chatlog";

const MessagesPage: React.FC = () => {
  return (
    <div className="w-[85vw] h-[75vh] flex">
      <RecentMessages />
      <Chatlog />
    </div>
  );
};

export default MessagesPage;
