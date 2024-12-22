import styles from "./homepage.module.css";
import ViewHistory from './History/ViewHistory';
const Home: React.FC = () => {
  return (
    <main>
      <h1>Home Page</h1>
      <ViewHistory />

    </main>
  );
};

export default Home;
