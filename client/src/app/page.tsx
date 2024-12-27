import styles from "./homepage.module.css";
import Leaderboard from "./components/Leaderboard";

const users = [
  { id: 1, name: "Alice", profilePicture: "https://via.placeholder.com/150", likes: 120 },
  { id: 2, name: "Bob", profilePicture: "https://via.placeholder.com/150", likes: 100 },
  { id: 3, name: "Charlie", profilePicture: "https://via.placeholder.com/150", likes: 90 },
  { id: 4, name: "Daisy", profilePicture: "https://via.placeholder.com/150", likes: 85 },
  { id: 5, name: "Eve", profilePicture: "https://via.placeholder.com/150", likes: 80 },
];

const Home: React.FC = () => {
  return (
    <main>
      <h1>Home Page</h1>
      <div style={{ width: "1920px", height: "1080px", background: "white" }}>
      <Leaderboard users={users} />;
    </div>
    </main>
  );
};

export default Home;
