import { useNavigate } from "react-router-dom";
import bgImg from "../../images/bg.jpg";
import { ROUTES } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";

const HomeDecorator = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleNavigate = () => {
    if (auth.authToken) {
      navigate(ROUTES.CREATE_COLLECTION);
    } else {
      navigate(ROUTES.SIGNIN, { state: { from: location.pathname } });
    }
  };
  return (
    <div
      className="hero mb-4 max-h-[85vh]"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="font-light text-bodydark1">
            <span className="text-3xl font-bold text-meta-5">M</span>ingle
            <span className="font-semibold text-meta-1">M</span>
            ate
          </h1>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Unlock Your Personal World:{" "}
            <span className="text-xl font-light text-bodydark1">
              <span className="text-3xl font-bold text-meta-5">M</span>ingle
              <span className="font-semibold text-meta-1">M</span>
              ate
            </span>{" "}
            Your Ultimate Collection Hub!
          </h2>
          <p className="text-sm">
            Dive into a realm where your passions take center stage. MingleMate
            empowers you to Explore, Create, and Connect with Your Treasured
            Items, Your Way.
          </p>
          <button onClick={handleNavigate} className="btn btn-primary mt-4">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDecorator;
