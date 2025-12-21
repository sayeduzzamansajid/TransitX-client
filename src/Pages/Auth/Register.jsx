import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import LoadingBar from "../Shared/LoadingBar";

const Register = () => {

  const { setTogl, createUser, setUser, googleSignIn, updateuser,user,loading } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if(loading){
    return LoadingBar
  }
  if(user){
    return <Navigate to={'/'}></Navigate>
  }

  //   const password = watch("password");

  //sign up with email and password
  const handleRegister = (data) => {
    const { name, email, photoURL, password } = data;
    console.log(name, email, photoURL, password);

    //create user with email and password
    createUser(email, password)
      .then(res => {
        // console.log(res.user);
        setUser(res.user)
        navigate("/")
        //updating user profile with name and image
        updateuser({
          displayName: name,
          photoURL: photoURL
        })
          .then(resp => {
            console.log(resp);
            toast.success("user created Successfully!")
          })
          .catch(err => {
            console.log(err);
            toast.error(err.message)
          })
      })
      .catch(errors => {
        console.log(errors);
        toast.error(errors.message)
      })

  };

  //Google sign In
  const handleGooglSignIn = () => {
    googleSignIn()
      .then(res => {
        // console.log(res.user);
        setUser(res.user)
        toast.success("Register Successful")
        navigate("/")
      })
      .catch(errors => {
        console.log(errors);
        toast.error(errors.message)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 pt-15 px-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-neutral">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="Profile photo URL"
              className="input input-bordered w-full"
              {...register("photoURL", {
                required: "Photo URL is required",
              })}
            />
            {errors.photoURL && (
              <p className="text-error text-sm mt-1">
                {errors.photoURL.message}
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
              placeholder="Create a password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message:
                    "Password must contain at least one uppercase and one lowercase letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          {/* <div>
            <label className="label">
              <span className="label-text font-medium">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="input input-bordered w-full"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}

          {/* Register button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Google Register */}
        <button onClick={handleGooglSignIn} className="btn btn-outline w-full flex items-center gap-2">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            onClick={() => setTogl(false)}
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
