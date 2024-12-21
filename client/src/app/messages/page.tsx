import styles from "./messages.module.css";
import RecentMessages from "./RecentMessages";
import Chatlog from "./Chatlog";
import { UserProvider } from "./UserProvider"; // Import the UserProvider

const MessagesPage: React.FC = () => {
  return (
    <UserProvider> {/* Wrap the content with the UserProvider */}
      <div className="w-[85vw] h-[75vh] flex">
        <RecentMessages />
        <Chatlog />
      </div>
    </UserProvider>
  );
};

export default MessagesPage;
