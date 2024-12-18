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
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-green-400 p-10 hidden md:block">Mamuye pic</div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-slate-300 p-5 px-10 "
        >
          <div className="">
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div
            className="text-right gap-y-7 hover:text-blue-300 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Already have an account? Log in
          </div>

          <button
            className="p-5 rounded-lg hover:bg-gray-600 bg-black text-white w-1/5 disabled:cursor-not-allowed"
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
