import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_ENDPOINT, AUTH_MESSAGES, REGEX_PICK } from "../../utils/constant";
import axios from "../../utils/api";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";

const SignUp = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    (userRef.current as HTMLInputElement | null)?.focus();
  }, []);

  useEffect(() => {
    setValidName(REGEX_PICK.USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(REGEX_PICK.PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(REGEX_PICK.EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const userData = {
    user: {
      user_name: user,
      email,
      password: pwd,
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_ENDPOINT.SIGN_UP, userData);
      if (isSuccessRes(res)) {
        toast.success(AUTH_MESSAGES.SUCCESS);
        navigate("/sign-in");

        setUser("");
        setPwd("");
        setMatchPwd("");
        setEmail("");
      }
    } catch (err) {
      setErrorToast(err);
      (errRef.current as HTMLInputElement | null)?.focus();
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
            <p
              ref={errRef}
              className={`${errMsg ? "text-center text-red-600" : "hidden"}`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="mt-2 text-center text-3xl font-bold">
              Sign Up now!
            </h1>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control relative">
                <label htmlFor="username" className="absolute right-0 top-3">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${validName ? "text-green-500" : "hidden"}`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validName || !user ? "hidden" : "text-red-500"
                    }`}
                  />
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  placeholder="Enter Your Name"
                  className="input input-bordered"
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={`${
                    userFocus && user && !validName ? "text-red-500" : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />1 to 24 characters.
                  {AUTH_MESSAGES.VALID_NAME_NOTE}
                </p>
              </div>
              <div className="form-control relative">
                <label htmlFor="email" className="absolute right-0 top-3">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${validEmail ? "text-green-500" : "hidden"}`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validEmail || !email ? "hidden" : "text-red-500"
                    }`}
                  />
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="off"
                  placeholder="What's Your Email?"
                  className="input input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={`${
                    emailFocus && email && !validEmail
                      ? "text-red-500"
                      : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {AUTH_MESSAGES.EMAIL_NOTE}
                </p>
              </div>
              <div className="form-control relative">
                <label htmlFor="password" className="absolute right-0 top-3">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${validPwd ? "text-green-500" : "hidden"}`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validPwd || !pwd ? "hidden" : "text-red-500"
                    }`}
                  />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  placeholder="Enter password"
                  className="input input-bordered"
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={`${
                    pwdFocus && !validPwd ? "text-red-500" : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {AUTH_MESSAGES.PWD_NOTE}
                </p>
              </div>
              <div className="form-control relative">
                <label htmlFor="confirm_pwd" className="absolute right-0 top-3">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={`${
                      validMatch && matchPwd ? "text-green-500" : "hidden"
                    }`}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={`${
                      validMatch || !matchPwd ? "hidden" : "text-red-500"
                    }`}
                  />
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  placeholder="Confirm password"
                  className="input input-bordered"
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={`${
                    matchFocus && !validMatch ? "text-red-500" : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {AUTH_MESSAGES.CONFIRM_PWD}
                </p>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    !validName || !validPwd || !validMatch || !validEmail
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-bold my-4 text-center">
              Already have an Account?{" "}
              <Link
                to="/sign-in"
                className="text-bold text-1xl text-orange-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;