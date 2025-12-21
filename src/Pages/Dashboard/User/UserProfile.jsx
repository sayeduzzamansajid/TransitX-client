import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const UserProfile = () => {
  // later: replace with auth user data
  const { user } = useAuth()
  const [role] = useRole()
//   const [role, isRoleLoading] = useRole()
  // const { role, isRoleLoading } = useRole()
//   console.log(role, isRoleLoading)
  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          src="https://i.ibb.co.com/Xf9MGqdT/Screenshot-2025-12-21-122033.png"
          alt='cover photo'
          className='w-full mb-4 rounded-t-lg h-56'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>
            {/* role  */}
          <p className='p-2 px-4 text-xs text-white bg-primary rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-gray-600 '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-gray-600 '>{user?.email}</span>
              </p>

              <div>
                <button className='bg-primary px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-secondary block mb-1'>
                  Update Profile
                </button>
                <button className='bg-primary px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-secondary'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserProfile;
