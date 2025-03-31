import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogIn";
import NavBar from "../ui/NavBar";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLoading || !email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left section (image placeholder) */}
        <div className="bg-green-400 p-10 hidden md:flex items-center justify-center h-full">
          Mamuye pic
        </div>

        {/* Right section (form) */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-slate-300 p-5 px-10 h-full justify-center"
        >
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="abiyasfaw1996@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="asdfasdf"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div
            className="text-right text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don&apos;t have an account? Sign up
          </div>

          <button
            className="p-3 rounded-lg hover:bg-gray-600 bg-black text-white w-full disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
