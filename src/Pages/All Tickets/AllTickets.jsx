// src/Pages/AllTickets/AllTickets.jsx
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import TicketCard from "./TicketCard";



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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {filteredTickets.map((ticket) => <TicketCard ticket={ticket}/>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
