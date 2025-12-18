import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const ForgotPassword = () => {

    const { user, resetPassword } = useAuth()

    const handleResetPass = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        console.log(user?.email||email)
        resetPassword(email)
            .then(res => {
                toast.success("check your mail to reset your password")
                console.log(res)
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
            })
    }
    return (<>
        <div className='h-[20vw] w-[80vw] mx-auto flex justify-center items-center my-30 bg-base-300 rounded-lg'>
            <form onSubmit={handleResetPass}>
                <p className='font-bold my-2 text-lg p-0.5'>Enter Your Email : </p>
                <label className="input validator bg-white">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input value={user?.email} name='email' type="email" placeholder="mail@site.com" className='placeholder:text-gray-400' />
                </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                <button type='submit' className='btn btn-primary text-white w-[95%] mt-3'>Reset Password</button>
            </form>
        </div>
    </>

    );
};

export default ForgotPassword;