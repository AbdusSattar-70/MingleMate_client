import { Link } from "react-router-dom";
import bgImg from "../../images/bg.jpg";
import { ROUTES } from "../../utils/constant";

const HomeDecorator = () => {
  return (
    <div
      className="hero max-h-[65vh]"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 p-4 text-4xl font-bold">
            <span className="text-clip text-meta-5">M</span>ingle
            <span className="text-clip text-meta-5">M</span>
            ate
          </h1>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Unlock Your Personal World: MingleMate Your Ultimate Collection Hub!
          </h2>
          <p className="text-sm">
            Dive into a realm where your passions take center stage. MingleMate
            empowers you to Explore, Create, and Connect with Your Treasured
            Items, Your Way.
          </p>
          <Link to={ROUTES.CREATE_COLLECTION} className="btn btn-primary mt-4">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeDecorator;
