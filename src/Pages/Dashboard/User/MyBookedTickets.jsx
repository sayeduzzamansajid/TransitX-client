// src/Pages/Dashboard/User/MyBookedTickets.jsx
// route example: /dashboard/user/bookings

const MyBookedTickets = () => {
  // later: load from backend
  const bookings = [
    {
      _id: "b1",
      ticketTitle: "Dhaka to Chattogram Express",
      image:
        "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
      from: "Dhaka",
      to: "Chattogram",
      unitPrice: 1200,
      bookedQuantity: 2,
      departureTime: "2025-12-25T09:00:00Z",
      status: "pending", // pending | accepted | rejected | paid
    },
    {
      _id: "b2",
      ticketTitle: "Dhaka to Sylhet Intercity",
      image:
        "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg",
      from: "Dhaka",
      to: "Sylhet",
      unitPrice: 900,
      bookedQuantity: 1,
      departureTime: "2025-12-20T07:30:00Z",
      status: "accepted",
    },
  ];

  const getStatusBadge = (status) => {
    const base = "badge badge-sm font-medium";
    if (status === "pending") return `${base} badge-ghost`;
    if (status === "accepted") return `${base} badge-info`;
    if (status === "rejected") return `${base} badge-error`;
    if (status === "paid") return `${base} badge-success`;
    return base;
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          My Booked Tickets
        </h1>
        <p className="text-sm text-neutral/70 text-center">
          All tickets you have booked, including payment status and departure
          time.
        </p>
      </header>

      {bookings.length === 0 ? (
        <p className="text-sm text-neutral/70">
          You have not booked any tickets yet.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:w-7xl mx-auto bg-base-200 ">
          {bookings.map((booking) => {
            const totalPrice = booking.unitPrice * booking.bookedQuantity;
            const departure = new Date(booking.departureTime).toLocaleString();

            // later: use real countdown based on departureTime
            const fakeCountdown = "02d 05h 30m";

            const canPay =
              booking.status === "accepted"; // later: also check not expired

            return (
              <article
                key={booking._id}
                className="bg-base-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <figure className="h-32 w-full overflow-hidden">
                  <img
                    src={booking.image}
                    alt={booking.ticketTitle}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-sm font-semibold text-neutral mb-1">
                    {booking.ticketTitle}
                  </h2>
                  <p className="text-xs text-neutral/70 mb-2">
                    {booking.from} → {booking.to}
                  </p>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <p>
                      Qty:{" "}
                      <span className="font-bold text-primary">
                        {booking.bookedQuantity}
                      </span>
                    </p>
                    <p>
                      Total:{" "}
                      <span className="font-semibold text-primary">
                        ৳ {totalPrice}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs text-neutral/70 mb-1">
                    Departure:{" "}
                    <span className="font-medium">{departure}</span>
                  </p>

                  <p className="text-xs text-neutral/70 mb-2">
                    Countdown:{" "}
                    <span className="font-medium">{fakeCountdown}</span>
                    {/* later: real countdown; hide when rejected or expired */}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </span>

                    <button
                      className="btn btn-xs btn-primary"
                      disabled={!canPay}
                    >
                      Pay Now
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

export default MyBookedTickets;
