import GetAllItems from "../items/GetAllItems";
import Footer from "./Footer";
import GetLargestCollections from "./GetLargestCollections";
import HomeDecorator from "./HomeDecorator";

const Home = () => {
  return (
    <section className="w-full">
      <HomeDecorator />
      <GetLargestCollections />
      <GetAllItems />
      <Footer />
    </section>
  );
};

export default Home;
