// src/Pages/Dashboard/Vendor/MyAddedTickets.jsx
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyAddedTickets = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-tickets", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tickets/${user.email}`);
      return res.data
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
  });

  const getStatusBadge = (status) => {
    const base = "badge badge-sm font-medium";
    if (status === "pending") return `${base} badge-ghost`;
    if (status === "approved") return `${base} badge-success`;
    if (status === "rejected") return `${base} badge-error`;
    return base;
  };

  if (loading || isLoading) {
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
    <section className="space-y-6 ">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          My Added Tickets
        </h1>
        <p className="text-sm text-neutral/70 text-center">
          All tickets you have created, along with their admin verification
          status.
        </p>
      </header>

      {tickets.length === 0 ? (
        <p className="text-sm text-neutral/70">
          You have not added any tickets yet.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:w-7xl mx-auto">
          {tickets.map((ticket) => {
            const isRejected = ticket.verificationStatus === "rejected";

            return (
              <article
                key={ticket._id}
                className="bg-base-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <figure className="h-32 w-full overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-semibold text-neutral">
                        {ticket.title}
                      </h2>
                      <p className="text-xs text-neutral/70">
                        {ticket.fromDistrict} → {ticket.toDistrict}
                      </p>
                    </div>
                    <span className={getStatusBadge(ticket.verificationStatus)}>
                      {ticket.verificationStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="badge badge-outline border-primary text-primary">
                      {ticket.transportType}
                    </span>
                    <span className="font-semibold text-primary">
                      ৳ {ticket.price}
                      <span className="text-[10px] text-neutral/60"> / seat</span>
                    </span>
                  </div>

                  <p className="text-xs text-neutral/70">
                    Quantity:{" "}
                    <span className="font-semibold">{ticket.quantity}</span>
                  </p>

                  <p className="text-xs text-neutral/70">
                    Departure:{" "}
                    <span className="font-medium">
                      {new Date(ticket.departure).toLocaleString()}
                    </span>
                  </p>

                  <p className="text-xs text-neutral/70">
                    Perks:{" "}
                    {ticket.perks && ticket.perks.length > 0
                      ? ticket.perks.join(", ")
                      : "Standard"}
                  </p>

                  <div className="mt-auto flex gap-2 pt-2">
                    <button
                      className="btn btn-xs btn-primary flex-1"
                      disabled={isRejected}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-xs btn-error flex-1"
                      disabled={isRejected}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyAddedTickets;
