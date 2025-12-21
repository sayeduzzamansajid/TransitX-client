// src/Pages/Dashboard/Admin/ManageTickets.jsx

const ManageTickets = () => {
  // later: load all tickets added by vendors
  const tickets = [
    {
      _id: "t1",
      title: "Dhaka to Chattogram Express",
      vendorName: "Vendor One",
      vendorEmail: "vendor1@example.com",
      transportType: "Bus",
      price: 1200,
      quantity: 40,
      status: "pending", // pending | approved | rejected
    },
    {
      _id: "t2",
      title: "Dhaka to Sylhet Intercity",
      vendorName: "Vendor Two",
      vendorEmail: "vendor2@example.com",
      transportType: "Train",
      price: 900,
      quantity: 25,
      status: "approved",
    },
  ];

  const handleApprove = (id) => {
    // later: PATCH /tickets/:id { verificationStatus: "approved" }
    console.log("approve ticket", id);
  };

  const handleReject = (id) => {
    // later: PATCH /tickets/:id { verificationStatus: "rejected" }
    console.log("reject ticket", id);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Manage Tickets
        </h1>
        <p className="text-sm text-neutral/70">
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
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} className="text-sm">
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td>
                  <p className="font-medium">{ticket.vendorName}</p>
                  <p className="text-xs text-neutral/70">
                    {ticket.vendorEmail}
                  </p>
                </td>
                <td>{ticket.transportType}</td>
                <td>{ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td className="capitalize">{ticket.status}</td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleApprove(ticket._id)}
                      disabled={ticket.status === "approved"}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleReject(ticket._id)}
                      disabled={ticket.status === "rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageTickets;
