import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignUp";
import NavBar from "../ui/NavBar";

function SignUp() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();

  function onSubmit({ email, password }) {
    signup({ email, password }, { onSettled: () => reset() });
  }

  if (isLoading) return <div>spinner...</div>;

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="bg-green-400 p-10 hidden md:flex items-center justify-center h-full">
          Mamuye pic
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 bg-slate-300 p-5 px-10 h-full justify-center"
        >
          <div>
            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                required: "This field is required",
              })}
              className="border rounded p-2 w-full"
            />
            <p className="text-red-500 text-sm">{errors?.email?.message}</p>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              className="border rounded p-2 w-full"
            />
            <p className="text-red-500 text-sm">{errors?.password?.message}</p>
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords need to match",
              })}
              className="border rounded p-2 w-full"
            />
            <p className="text-red-500 text-sm">
              {errors?.passwordConfirm?.message}
            </p>
          </div>

          <div
            className="text-right gap-y-7 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in
          </div>

          <button className="p-3 rounded-lg hover:bg-gray-600 bg-black text-white w-full">
            Create account
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
