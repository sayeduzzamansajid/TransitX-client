// src/Pages/Dashboard/Admin/AdminProfile.jsx

import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  // later: load from auth / backend
//   const admin = {
//     name: "Demo Admin",
//     email: "admin@example.com",
//     role: "admin",
//     photoURL: "https://i.pravatar.cc/150?img=11",
//     joinedAt: "2025-01-01",
//   };

const {user} =useAuth()
  return (
    <>
    <div className='flex justify-center items-center h-[90vh]'>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          src="https://i.ibb.co.com/NnnfvGD6/image.png"
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
            Customer
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
    {/* <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Admin Profile
        </h1>
        <p className="text-sm text-neutral/70">
          Overview of your admin account details.
        </p>
      </header>

      <div className="bg-base-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="shrink-0">
          <img
            src={admin.photoURL}
            alt={admin.name}
            className="w-24 h-24 rounded-full object-cover border border-base-300"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 w-full">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Name
            </p>
            <p className="font-semibold text-neutral">{admin.name}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Email
            </p>
            <p className="font-semibold text-neutral">{admin.email}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Role
            </p>
            <p className="font-semibold text-primary capitalize">
              {admin.role}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Member since
            </p>
            <p className="font-semibold text-neutral">{admin.joinedAt}</p>
          </div>
        </div>
      </div>
    </section> */}
    </>
  );
};

export default AdminProfile;
