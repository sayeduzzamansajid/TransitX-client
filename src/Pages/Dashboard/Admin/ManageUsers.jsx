// src/Pages/Dashboard/Admin/ManageUsers.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // load all users
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  // make admin / vendor
  const roleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
    },
  });

  // mark fraud
  const fraudMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch(`/users/${id}/fraud`, { isFraud: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You want to make him Admin?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {

        roleMutation.mutate({ id, role: "admin" });
        Swal.fire({
          title: "Role Updated!",
          text: "User is now admin",
          icon: "success"
        });
      }
    });
  };

  const handleMakeVendor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You want to make him Vendor?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {

        roleMutation.mutate({ id, role: "vendor" });
        Swal.fire({
          title: "Role Updated!",
          text: "User is now admin",
          icon: "success"
        });
      }
    });
  };

  const handleMarkFraud = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do You want to make him Vendor?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {

        fraudMutation.mutate(id);
        Swal.fire({
          title: "Role Updated!",
          text: "User is now Fraud",
          icon: "success"
        });
      }
    });
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner text-primary" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-red-500">
          Failed to load users: {error.message}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6 lg:w-7xl mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Manage Users
        </h1>
        <p className="text-sm text-neutral/70 text-center">
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
                      disabled={user.role === "admin" || user?.email === 'vendor@gmail.com' || user?.email === 'user@gmail.com' || roleMutation.isLoading}
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleMakeVendor(user._id)}
                      disabled={user.role === "vendor" || user?.email === 'sayeduzzamansajid@gmail.com' || user?.email === 'admin@gmail.com' || user?.email === 'user@gmail.com' || roleMutation.isLoading}
                    >
                      Make Vendor
                    </button>
                  </div>
                </td>
                <td>
                  {user.role === "vendor" && (
                    <button
                      className={`btn btn-xs ${user.isFraud ? "btn-error" : "btn-outline"
                        }`}
                      onClick={() => handleMarkFraud(user._id)}
                      disabled={user.isFraud || fraudMutation.isLoading || user?.email === 'vendor@gmail.com'}
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
