import GetLargestCollections from "../collection/GetLargestCollections";
import HomeDecorator from "./HomeDecorator";

const Home = () => {
  return (
    <section>
      <HomeDecorator />
      <GetLargestCollections />
    </section>
  );
};

export default Home;
