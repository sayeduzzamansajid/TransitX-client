import { useForm } from "react-hook-form";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { setTogl, setUser, signIn, googleSignIn,user } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if(user){
    return <Navigate to={"/"}></Navigate>
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(res => {
        toast.success("Logged in")
        navigate(from)})
      .catch(errors =>{
        console.log(errors);
        toast.error(errors.message)
      })
    // console.log(email,password);

    // 🔥 Firebase login will be added later

  };

  const handleGogleSignIn = () => {
    googleSignIn()
      .then(res => {
        // console.log(res.user);
        setUser(res.user)
        toast.success("Login Successful")
        navigate(from)
      })
      .catch(errors =>{
        console.log(errors);
        toast.error(errors.message)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-neutral">
          Login to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <NavLink to={"forgot-password"}>

              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </NavLink>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Google Login */}
        <button onClick={handleGogleSignIn} className="btn btn-outline w-full flex items-center gap-2">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Register link */}
        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            onClick={() => setTogl(true)}
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
