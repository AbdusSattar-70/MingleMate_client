import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  API_ENDPOINT,
  MESSAGES,
  REGEX_PICK,
  ROUTES,
} from "../../utils/constant";
import axios from "../../utils/api";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import SmallSpinner from "../common/SmallSpinner";
import Spinner from "../common/Spinner";
import useAuthentication from "../../hooks/useAuthentication";

const SignUp = () => {
  const { isLoading: wakeUpServerLoading } = useAuthentication();
  const navigate = useNavigate();
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await axios.post(API_ENDPOINT.SIGN_UP, userData);
      if (isSuccessRes(res)) {
        setLoading(false);
        toast.success(MESSAGES.SUCCESS);
        navigate("/sign-in");
        setUser("");
        setPwd("");
        setMatchPwd("");
        setEmail("");
      }
    } catch (err) {
      setLoading(false);
      setErrorToast(err);
      (errRef.current as HTMLInputElement | null)?.focus();
    }
  };

  return (
    <>
      {wakeUpServerLoading ? (
        <Spinner />
      ) : (
        <section>
          <div className="hero hero-content">
            <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl  dark:bg-meta-4">
              <p
                ref={errRef}
                className={`${errMsg ? "text-center text-meta-1" : "hidden"}`}
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
                      className={`${validName ? "text-meta-5" : "hidden"}`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validName || !user ? "hidden" : "text-meta-1"
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
                    className="input input-bordered dark:bg-form-input"
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <p
                    id="uidnote"
                    className={`${
                      userFocus && user && !validName ? "text-meta-1" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />1 to 24 characters.
                    {MESSAGES.VALID_NAME_NOTE}
                  </p>
                </div>
                <div className="form-control relative">
                  <label htmlFor="email" className="absolute right-0 top-3">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${validEmail ? "text-meta-5" : "hidden"}`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validEmail || !email ? "hidden" : "text-meta-1"
                      }`}
                    />
                  </label>
                  <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    placeholder="What's Your Email?"
                    className="input input-bordered dark:bg-form-input"
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
                        ? "text-meta-1"
                        : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {MESSAGES.EMAIL_NOTE}
                  </p>
                </div>
                <div className="form-control relative">
                  <label htmlFor="password" className="absolute right-0 top-3">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${validPwd ? "text-meta-5" : "hidden"}`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validPwd || !pwd ? "hidden" : "text-meta-1"
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
                    className="input input-bordered dark:bg-form-input"
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={`${
                      pwdFocus && !validPwd ? "text-meta-1" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {MESSAGES.PWD_NOTE}
                  </p>
                </div>
                <div className="form-control relative">
                  <label
                    htmlFor="confirm_pwd"
                    className="absolute right-0 top-3"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`${
                        validMatch && matchPwd ? "text-meta-5" : "hidden"
                      }`}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={`${
                        validMatch || !matchPwd ? "hidden" : "text-meta-1"
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
                    className="input input-bordered dark:bg-form-input"
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id="confirmnote"
                    className={`${
                      matchFocus && !validMatch ? "text-meta-1" : "hidden"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {MESSAGES.CONFIRM_PWD}
                  </p>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary disabled:bg-bodydark2 disabled:text-white"
                    disabled={
                      !validName || !validPwd || !validMatch || !validEmail
                    }
                  >
                    {loading ? <SmallSpinner /> : " Sign Up"}
                  </button>
                </div>
              </form>
              <p className="text-bold my-4 px-4 text-center">
                Already have an Account?{" "}
                <Link
                  to={ROUTES.SIGNIN}
                  className="text-bold text-1xl text-orange-500"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
