// src/Pages/Dashboard/Vendor/MyAddedTickets.jsx

const MyAddedTickets = () => {
  // later: load from backend for current vendor
  const tickets = [
    {
      _id: "t1",
      title: "Dhaka to Chattogram Express",
      image:
        "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
      from: "Dhaka",
      to: "Chattogram",
      transportType: "Bus",
      price: 1200,
      quantity: 40,
      departureTime: "2025-12-25T09:00:00Z",
      perks: ["AC", "Snacks"],
      verificationStatus: "pending", // pending | approved | rejected
    },
    {
      _id: "t2",
      title: "Dhaka to Sylhet Intercity",
      image:
        "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg",
      from: "Dhaka",
      to: "Sylhet",
      transportType: "Train",
      price: 900,
      quantity: 25,
      departureTime: "2025-12-21T07:30:00Z",
      perks: ["AC"],
      verificationStatus: "approved",
    },
  ];

  const getStatusBadge = (status) => {
    const base = "badge badge-sm font-medium";
    if (status === "pending") return `${base} badge-ghost`;
    if (status === "approved") return `${base} badge-success`;
    if (status === "rejected") return `${base} badge-error`;
    return base;
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          My Added Tickets
        </h1>
        <p className="text-sm text-neutral/70">
          All tickets you have created, along with their admin verification
          status.
        </p>
      </header>

      {tickets.length === 0 ? (
        <p className="text-sm text-neutral/70">
          You have not added any tickets yet.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                        {ticket.from} → {ticket.to}
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
                      {new Date(ticket.departureTime).toLocaleString()}
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
                      className="btn btn-xs btn-outline flex-1"
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
