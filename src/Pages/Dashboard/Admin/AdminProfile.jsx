// src/Pages/Dashboard/Admin/AdminProfile.jsx

const AdminProfile = () => {
  // later: load from auth / backend
  const admin = {
    name: "Demo Admin",
    email: "admin@example.com",
    role: "admin",
    photoURL: "https://i.pravatar.cc/150?img=11",
    joinedAt: "2025-01-01",
  };

  return (
    <section className="space-y-6">
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
    </section>
  );
};

export default AdminProfile;
