import { useForm } from "react-hook-form";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { saveOrUpdateUser } from "../../Utils";
import { BiDevices } from "react-icons/bi";
import LoadingBar from "../Shared/LoadingBar";

const Login = () => {
  const { setTogl, setUser, signIn, googleSignIn, user, loading, setLoading } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (user) {
    return <Navigate to={"/"}></Navigate>
  }
  if (loading) {
    return <LoadingBar />
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(res => {
        console.log(res);
        toast.success("Logged in")
        navigate(from)
      })
      .catch(errors => {
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
        const userData = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          image: res?.user?.photoURL
        }
        saveOrUpdateUser(userData) //save user to mongodb
        toast.success("Login Successful")
        navigate(from)
      })
      .catch(errors => {
        console.log(errors);
        toast.error(errors.message)
      })
  }

  const handleDemo = () => {
    document.getElementById('demoModal').showModal()
  }
  const demoAdmin = () => {
    setLoading(true)
    const email = 'admin@gmail.com'
    const password = 'Admin@gmail.com'
    signIn(email, password)
      .then(res => {
        setLoading(false)
        console.log(res);
        toast.success("Logged in")
        navigate(from)
      })
      .catch(errors => {
        console.log(errors);
        toast.error(errors.message)
      })
  }
  const demoVendor = () => {
    setLoading(true)
    const email = 'vendor@gmail.com'
    const password = 'Vendor@gmail.com'
    signIn(email, password)
      .then(res => {
        setLoading(false)
        console.log(res);
        toast.success("Logged in")
        navigate(from)
      })
      .catch(errors => {
        console.log(errors);
        toast.error(errors.message)
      })
  }
  const demoUser = () => {
    setLoading(true)
    const email = 'user@gmail.com'
    const password = 'User@gmail.com'
    signIn(email, password)
      .then(res => {
        setLoading(false)
        console.log(res);
        toast.success("Logged in")
        navigate(from)
      })
      .catch(errors => {
        console.log(errors);
        toast.error(errors.message)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 ">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl lg:mt-5">
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

        {/* Demo Login */}
        <button onClick={handleDemo} className="btn btn-outline w-full flex items-center gap-2 ">
          <BiDevices />
          Demo Credincial
        </button>
        {/* Google Login */}
        <button onClick={handleGogleSignIn} className="btn btn-outline w-full flex items-center gap-2 mt-5">
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
      <dialog id="demoModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Log in as a</p>
          <div>
            <button onClick={demoAdmin} className="btn btn-outline hover:bg-primary hover:text-white ml-5">Admin </button>
            <button onClick={demoVendor} className="btn btn-outline hover:bg-primary hover:text-white ml-5">Vendor</button>
            <button onClick={demoUser} className="btn btn-outline hover:bg-primary hover:text-white ml-5">User</button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
{/* Open the modal using document.getElementById('ID').showModal() method */ }
