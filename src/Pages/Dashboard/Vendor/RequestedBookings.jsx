// src/Pages/Dashboard/Vendor/RequestedBookings.jsx

const RequestedBookings = () => {
  // later: load from backend for this vendor
  const requests = [
    {
      _id: "r1",
      userName: "Arif Hasan",
      userEmail: "arif@example.com",
      ticketTitle: "Dhaka to Chattogram Express",
      bookingQuantity: 2,
      unitPrice: 1200,
    },
    {
      _id: "r2",
      userName: "Nadia Rahman",
      userEmail: "nadia@example.com",
      ticketTitle: "Dhaka to Sylhet Intercity",
      bookingQuantity: 1,
      unitPrice: 900,
    },
  ];

  const handleAccept = (id) => {
    // later: call PATCH /bookings/:id?status=accepted
    console.log("accept", id);
  };

  const handleReject = (id) => {
    // later: call PATCH /bookings/:id?status=rejected
    console.log("reject", id);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Requested Bookings
        </h1>
        <p className="text-sm text-neutral/70">
          Manage booking requests for your tickets by accepting or rejecting
          them.
        </p>
      </header>

      {requests.length === 0 ? (
        <p className="text-sm text-neutral/70">
          You do not have any booking requests right now.
        </p>
      ) : (
        <div className="bg-base-200 rounded-2xl p-4 overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="text-xs text-neutral/70">
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Ticket</th>
                <th>Qty</th>
                <th>Total Price (৳)</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => {
                const totalPrice = req.unitPrice * req.bookingQuantity;
                return (
                  <tr key={req._id} className="text-sm">
                    <td>{index + 1}</td>
                    <td>{req.userName}</td>
                    <td className="text-xs text-neutral/80">{req.userEmail}</td>
                    <td>{req.ticketTitle}</td>
                    <td>{req.bookingQuantity}</td>
                    <td className="font-semibold text-primary">
                      {totalPrice}
                    </td>
                    <td>
                      <div className="flex gap-2 justify-center">
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleAccept(req._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleReject(req._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default RequestedBookings;
