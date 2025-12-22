// src/Pages/AllTickets/AllTickets.jsx
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import { FaBusAlt, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const transportIcons = {
  Bus: <FaBusAlt />,
  Train: <FaTrain />,
  Plane: <FaPlane />,
  Launch: <FaShip />,
};

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const AllTickets = () => {
  const [transportFilter, setTransportFilter] = useState("All");
  const [priceSort, setPriceSort] = useState(""); // "", "low", "high"
  const [routeQuery, setRouteQuery] = useState("");

  // load only admin‑approved tickets
  const { data: tickets = [], isLoading, isError, error } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tickets/approved");
      return res.data;
    },
  });

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    // route search: fromDistrict/toDistrict or from/to string
    if (routeQuery.trim()) {
      const q = routeQuery.toLowerCase();
      result = result.filter((t) => {
        const from =
          t.fromDistrict ||
          t.from ||
          "";
        const to =
          t.toDistrict ||
          t.to ||
          "";
        const routeText = `${from} ${to}`.toLowerCase();
        return routeText.includes(q);
      });
    }

    // filter by transport type
    if (transportFilter !== "All") {
      result = result.filter(
        (t) => t.transportType === transportFilter
      );
    }

    // sort by price
    if (priceSort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [tickets, routeQuery, transportFilter, priceSort]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-sm">
          Failed to load tickets: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-16 px-4 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          All Available Tickets
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Browse and book tickets from multiple transport services
        </p>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Route search */}
          <input
            type="text"
            placeholder="Search From → To (e.g. Dhaka Chittagong)"
            value={routeQuery}
            onChange={(e) => setRouteQuery(e.target.value)}
            className="input input-bordered w-full md:flex-1"
          />

          {/* Transport filter */}
          <select
            value={transportFilter}
            onChange={(e) => setTransportFilter(e.target.value)}
            className="select select-bordered w-full md:w-48"
          >
            <option value="All">All Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Flight</option>
            <option value="Launch">Launch</option>
          </select>

          {/* Price sort */}
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
            className="select select-bordered w-full md:w-48"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {/* Ticket Cards */}
        {filteredTickets.length === 0 ? (
          <p className="text-center text-sm text-neutral/70">
            No tickets found for this search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
              >
                <figure className="h-40 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {ticket.title}
                      </h3>
                      <p className="text-xs text-neutral/70 mt-1">
                        {ticket.fromDistrict} → {ticket.toDistrict}
                      </p>
                    </div>
                    <span className="badge badge-primary">
                      {ticket.transportType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral/70">
                    <span className="flex items-center gap-1">
                      <span className="text-primary text-lg">
                        {transportIcons[ticket.transportType] ||
                          transportIcons.Bus}
                      </span>
                      {ticket.quantity} seats
                    </span>
                    <span className="text-xs">
                      ৳{" "}
                      <span className="font-semibold text-primary">
                        {ticket.price}
                      </span>{" "}
                      / seat
                    </span>
                  </div>

                  <p className="text-xs text-neutral/70">
                    Perks:{" "}
                    {ticket.perks && ticket.perks.length > 0
                      ? ticket.perks.join(", ")
                      : "Standard"}
                  </p>

                  <p className="text-xs text-neutral/70">
                    Departure:{" "}
                    <span className="font-medium">
                      {new Date(ticket.departure).toLocaleString()}
                    </span>
                  </p>

                  <div className="mt-3">
                    <Link to={`/tickets/${ticket._id}`}>
                      <button className="btn btn-primary w-full">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
