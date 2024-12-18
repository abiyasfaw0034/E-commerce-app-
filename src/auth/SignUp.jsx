import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignUp";

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
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-green-400 p-10 hidden md:block">Mamuye pic</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-slate-300 p-5 px-10 "
      >
        <div>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "This field is required",
            })}
          />
          <p>{errors?.password?.message}</p>
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
          />
          <p>{errors?.password?.message}</p>
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
          />
          <p>{errors?.passwordConfirm?.message}</p>
        </div>

        <div
          className="text-right gap-y-7 hover:text-blue-300 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Log in
        </div>

        <button className="p-5 rounded-lg hover:bg-gray-600 bg-black text-white w-1/5">
          Create account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
