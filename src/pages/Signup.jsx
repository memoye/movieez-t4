import { Link, useNavigate } from "react-router-dom";
import { signupbg } from "../assets";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaCircleNotch, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("password");

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const { user, signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // const passwordRegex = /^[A-Za-z0-9]{8}$/;
    // console.log(password, confirm)
    // if (!passwordRegex.test(password)) return setError('Password must be alphanumeric and at least 8 digits long')
    // console.log(password, email)

    try {
      await signUp(email, password);
      setLoading(false);
      if (password !== confirm && password === "")
        return setError("Passwords do no match");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);
    }
  };

  function toggleType() {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  return (
    <>
      <div className="h-screen w-full">
        <img
          className="absolute hidden h-full w-full object-cover sm:block"
          src={signupbg}
          alt={"sign up to Movieez!"}
        />
        <div className="fixed left-0 top-0 h-screen w-full bg-black/60"></div>
        <div className="fixed z-50 w-full px-4 py-4 ">
          <div className="mx-auto h-[600px] max-w-[450px] bg-black/75 text-white">
            <div className="mx-auto max-w-[320px] py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              {error ? <p className="my-2 bg-red-400 p-3">{error}</p> : null}
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-2 rounded bg-gray-700 p-3"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />

                <div className="relative ">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-2 w-full rounded bg-gray-700 p-3"
                    type={type}
                    placeholder="Password"
                  />
                  <p onClick={() => toggleType()}>
                    {type == "password" ? (
                      <FaEye className="absolute right-2 top-1/2 z-20 -translate-y-1/2 " />
                    ) : (
                      <FaEyeSlash className="absolute right-2 top-1/2 z-20 -translate-y-1/2  " />
                    )}
                  </p>
                </div>

                <div className="relative ">
                  <input
                    onChange={(e) => setConfirm(e.target.value)}
                    className="my-2 w-full rounded bg-gray-700 p-3"
                    type={type}
                    placeholder="Confirm password"
                  />
                  <p onClick={() => toggleType()}>
                    {type == "password" ? (
                      <FaEye className="absolute right-2 top-1/2 z-20 -translate-y-1/2  " />
                    ) : (
                      <FaEyeSlash className="absolute right-2 top-1/2 z-20 -translate-y-1/2  " />
                    )}
                  </p>
                </div>

                <button
                  disabled={loading}
                  className="my-6 rounded bg-yellow-600 py-3 text-center font-bold disabled:bg-slate-800"
                >
                  {" "}
                  {!loading ? "Sign up" : "Signin you up..."}
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" /> Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-4">
                  <span className="py-8 text-gray-600">
                    Already have an account?
                  </span>{" "}
                  <Link to={"/login"}>Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
