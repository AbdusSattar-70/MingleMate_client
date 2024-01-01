import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import axios from "../../api/axios";
const LOGIN_URL = "/signin";

const SignIn = () => {
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    (emailRef.current as HTMLInputElement | null)?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      user: {
        email,
        password: pwd,
      },
    };
    try {
      const res = await axios.post(LOGIN_URL, data);
      const accessToken = res.headers["authorization"];
      setAuth({ isAuthenticated: true, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
      console.log(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <div className="hero hero-content">
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
            />
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
                  className="input input-bordered"
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
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-bold my-4 text-center">
              Don&apos;t have an Account?{" "}
              <Link
                to="/sign-up"
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
