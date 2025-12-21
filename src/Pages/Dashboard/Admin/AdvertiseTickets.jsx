// src/Pages/Dashboard/Admin/AdvertiseTickets.jsx
import { useState } from "react";

const AdvertiseTickets = () => {
  // later: load all admin-approved tickets
  const [tickets, setTickets] = useState([
    {
      _id: "t1",
      title: "Dhaka to Chattogram Express",
      transportType: "Bus",
      price: 1200,
      isAdvertised: true,
    },
    {
      _id: "t2",
      title: "Dhaka to Sylhet Intercity",
      transportType: "Train",
      price: 900,
      isAdvertised: false,
    },
  ]);

  const toggleAdvertise = (id) => {
    // later: enforce max 6 advertised and sync with backend
    setTickets((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, isAdvertised: !t.isAdvertised } : t
      )
    );
  };

  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Advertise Tickets
        </h1>
        <p className="text-sm text-neutral/70">
          Control which approved tickets appear in the advertisement section on
          the homepage.
        </p>
      </header>

      <p className="text-xs text-neutral/70">
        Currently advertised:{" "}
        <span className="font-semibold text-primary">{advertisedCount}</span>{" "}
        (max 6).
      </p>

      <div className="bg-base-200 rounded-2xl p-4 overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="text-xs text-neutral/70">
              <th>#</th>
              <th>Title</th>
              <th>Transport</th>
              <th>Price (৳)</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} className="text-sm">
                <td>{index + 1}</td>
                <td>{ticket.title}</td>
                <td>{ticket.transportType}</td>
                <td>{ticket.price}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm toggle-primary"
                    checked={ticket.isAdvertised}
                    onChange={() => toggleAdvertise(ticket._id)}
                    // later: disable when already 6 advertised and turning on a new one
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
