// src/Pages/Dashboard/Admin/ManageTickets.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1) Load all tickets
  // 1) Load all tickets
  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      // 🔽 add this sort
      return res.data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },
  });


  // 2) Approve mutation
  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/tickets/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-tickets"]);
    },
    onError: (err) => {
      console.error("Approve error:", err);
    },
  });

  // 3) Reject mutation
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/tickets/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-tickets"]);
    },
    onError: (err) => {
      console.error("Reject error:", err);
    },
  });

  const handleApprove = (id) => {
    console.log("Approve clicked", id);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want ot Approve this Ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {

        approveMutation.mutate(id);
        Swal.fire({
          title: "Approved!",
          text: "This Ticket has been approved.",
          icon: "success"
        });
      }
    });

  };

  const handleReject = (id) => {
    console.log("Reject clicked", id);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want ot reject this Ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result) => {
      if (result.isConfirmed) {

        rejectMutation.mutate(id);
        Swal.fire({
          title: "Rejected!",
          text: "This Ticket has been Rejected.",
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
          Failed to load tickets: {error.message}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6 lg:w-7xl mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Manage Tickets
        </h1>
        <p className="text-sm text-neutral/70 text-center">
          Review tickets added by vendors and approve or reject them.
        </p>
      </header>

      <div className="bg-base-200 rounded-2xl p-4 overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-neutral/70">
              <th>#</th>
              <th>Title</th>
              <th>Vendor</th>
              <th>Transport</th>
              <th>Price (৳)</th>
              <th>Qty</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => {
              const status = ticket.verificationStatus || "pending";
              const isApproving =
                approveMutation.isLoading &&
                approveMutation.variables === ticket._id;
              const isRejecting =
                rejectMutation.isLoading &&
                rejectMutation.variables === ticket._id;

              return (
                <tr key={ticket._id} className="text-sm">
                  <td>{index + 1}</td>
                  <td>{ticket.title}</td>
                  <td>
                    <p className="font-medium">{ticket.seller?.name}</p>
                    <p className="text-xs text-neutral/70">
                      {ticket.seller?.email}
                    </p>
                  </td>
                  <td>{ticket.transportType}</td>
                  <td>{ticket.price}</td>
                  <td>{ticket.quantity}</td>
                  <td className="capitalize">{status}</td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleApprove(ticket._id)}
                        disabled={status === "approved" || isApproving}
                      >
                        {isApproving ? (
                          <span className="loading loading-xs loading-spinner" />
                        ) : (
                          "Approve"
                        )}
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleReject(ticket._id)}
                        disabled={status === "rejected" || isRejecting}
                      >
                        {isRejecting ? (
                          <span className="loading loading-xs loading-spinner" />
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageTickets;
