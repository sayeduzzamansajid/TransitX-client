// src/Pages/Dashboard/Admin/ManageUsers.jsx

const ManageUsers = () => {
  // later: load all users
  const users = [
    {
      _id: "u1",
      name: "Normal User",
      email: "user@example.com",
      role: "user",
      isFraud: false,
    },
    {
      _id: "u2",
      name: "Vendor One",
      email: "vendor1@example.com",
      role: "vendor",
      isFraud: false,
    },
    {
      _id: "u3",
      name: "Vendor Fraud",
      email: "fraud@example.com",
      role: "vendor",
      isFraud: true,
    },
  ];

  const handleMakeAdmin = (id) => {
    // later: PATCH /users/:id { role: "admin" }
    console.log("make admin", id);
  };

  const handleMakeVendor = (id) => {
    // later: PATCH /users/:id { role: "vendor" }
    console.log("make vendor", id);
  };

  const handleMarkFraud = (id) => {
    // later: PATCH /users/:id { isFraud: true } and hide all vendor tickets
    console.log("mark fraud", id);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Manage Users
        </h1>
        <p className="text-sm text-neutral/70">
          Control roles and mark fraud vendors to keep the platform safe.
        </p>
      </header>

      <div className="bg-base-200 rounded-2xl p-4 overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-neutral/70">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Fraud</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-sm">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td className="text-xs text-neutral/80">{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleMakeVendor(user._id)}
                      disabled={user.role === "vendor"}
                    >
                      Make Vendor
                    </button>
                  </div>
                </td>
                <td>
                  {user.role === "vendor" && (
                    <button
                      className={`btn btn-xs ${
                        user.isFraud ? "btn-error" : "btn-outline"
                      }`}
                      onClick={() => handleMarkFraud(user._id)}
                      disabled={user.isFraud}
                    >
                      {user.isFraud ? "Fraud" : "Mark as Fraud"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
