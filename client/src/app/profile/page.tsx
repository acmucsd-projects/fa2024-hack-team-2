import styles from "./profile.module.css";
import UserPage from "./userPage";
const ProfilePage: React.FC = () => {
  return (
    <div className="title-demo">
      <h1>Profile Page</h1>
      <UserPage/>
    </div>
   
  );
};

export default ProfilePage;
