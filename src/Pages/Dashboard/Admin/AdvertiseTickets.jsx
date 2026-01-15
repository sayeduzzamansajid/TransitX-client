// src/Pages/Dashboard/Admin/AdvertiseTickets.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/approved");
      // only approved tickets; backend route should return verificationStatus: "approved" ones
      return res.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isAdvertised }) =>
      axiosSecure.patch(`/tickets/${id}/advertise`, { isAdvertised }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-advertise-tickets"]);
    },
  });

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

  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  const handleToggle = (ticket) => {
    const next = !ticket.isAdvertised;

    // extra guard on frontend for max 6
    if (next && advertisedCount >= 8) {
      Swal.fire({
        title: "Opps Sorry",
        text: "You Can't Advertise more than 6 Ticket",
        icon: "error"
      });
      return;
    }

    toggleMutation.mutate({ id: ticket._id, isAdvertised: next });
  };

  return (
    <section className="space-y-6 lg:w-7xl mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Advertise Tickets
        </h1>
        <p className="text-sm text-neutral/70 text-center">
          Toggle tickets to show them in the homepage advertisement section.
        </p>
        <p className="text-md text-neutral/60 font-bold mt-1">
          Currently advertised:{" "}
          <span className="font-semibold text-primary">
            {advertisedCount} / 6
          </span>
        </p>
      </header>

      <div className="bg-base-200 rounded-2xl p-4 overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-neutral/70">
              <th>#</th>
              <th>Title</th>
              <th>Route</th>
              <th>Transport</th>
              <th>Price (৳)</th>
              <th>Qty</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} className="text-sm">
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td className="text-xs text-neutral/70">
                  {ticket.fromDistrict} → {ticket.toDistrict}
                </td>
                <td>{ticket.transportType}</td>
                <td>{ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm toggle-primary"
                    checked={!!ticket.isAdvertised}
                    onChange={() => handleToggle(ticket)}
                    disabled={toggleMutation.isLoading}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdvertiseTickets;
