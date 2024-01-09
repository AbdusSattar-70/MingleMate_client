import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/api";
import { API_ENDPOINT, ROUTES } from "../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";

const SignIn = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    (emailRef.current as HTMLInputElement | null)?.focus();
  }, []);

  const signInData = {
    user: {
      email,
      password: pwd,
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_ENDPOINT.SIGN_IN, signInData);
      if (isSuccessRes(res)) {
        const {
          id,
          user_name,
          email,
          bio,
          profession,
          avatar,
          items_count,
          collections_count,
          updated_at,
        } = res.data.data;
        const { authorization } = res.headers;
        setAuth({
          id,
          user_name,
          email,
          bio,
          profession,
          avatar,
          items_count,
          collections_count,
          updated_at,
          authToken: authorization,
        });
        setEmail("");
        setPwd("");
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorToast(err);
    }
  };

  return (
    <>
      <section>
        <div className="hero hero-content ">
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
            <h1 className="mt-2 text-center text-3xl font-bold">
              Sign In now!
            </h1>
            <h2 className="mt-2 text-center text-xl">Good to see you again!</h2>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="email"
                  className="input input-bordered dark:bg-form-input"
                />
              </div>
              <div className="form-control">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  placeholder="Enter password"
                  className="input input-bordered dark:bg-form-input"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-bold my-4 px-4 text-center">
              Don&apos;t have an Account?{" "}
              <Link
                to={ROUTES.SIGNUP}
                className="text-bold text-1xl text-orange-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
