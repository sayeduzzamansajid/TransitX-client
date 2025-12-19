import { FaBusAlt, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router";

const ticketsData = [
    {
        id: 1,
        type: "Bus",
        route: "Dhaka → Chittagong",
        time: "08:00 AM",
        price: 1200,
        icon: <FaBusAlt />
    },
    {
        id: 2,
        type: "Train",
        route: "Dhaka → Sylhet",
        time: "09:30 AM",
        price: 900,
        icon: <FaTrain />
    },
    {
        id: 3,
        type: "Flight",
        route: "Dhaka → Cox's Bazar",
        time: "01:00 PM",
        price: 6500,
        icon: <FaPlane />
    },
    {
        id: 4,
        type: "Launch",
        route: "Dhaka → Barishal",
        time: "07:00 PM",
        price: 700,
        icon: <FaShip />
    }
];
//after backend 

// const [ticketsData, setTicketsData] = useState([]);

// useEffect(() => {
//   fetch("http://localhost:5000/tickets")
//     .then(res => res.json())
//     .then(data => setTicketsData(data));
// }, []);

const AllTickets = () => {
    const [filter, setFilter] = useState("All");

    const filteredTickets =
        filter === "All"
            ? ticketsData
            : ticketsData.filter(ticket => ticket.type === filter);

    return (
        <div className="min-h-screen bg-base-100 py-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h2 className="text-4xl font-bold text-center mb-3">
                    All Available Tickets
                </h2>
                <p className="text-center text-gray-500 mb-10">
                    Browse and book tickets from multiple transport services
                </p>

                {/* Filter */}
                <div className="flex justify-center gap-4 mb-10 flex-wrap">
                    {["All", "Bus", "Train", "Flight", "Launch"].map(item => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`btn btn-sm ${filter === item ? "btn-primary" : "btn-outline"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Ticket Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTickets.map(ticket => (
                        <div
                            key={ticket.id}
                            className="bg-base-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl text-primary">
                                    {ticket.icon}
                                </span>
                                <h3 className="text-xl font-semibold">
                                    {ticket.type}
                                </h3>
                            </div>

                            <p className="text-gray-600 mb-1">
                                Route: <span className="font-medium">{ticket.route}</span>
                            </p>
                            <p className="text-gray-600 mb-1">
                                Departure: <span className="font-medium">{ticket.time}</span>
                            </p>
                            <p className="text-gray-600 mb-4">
                                Price: <span className="font-semibold text-primary">
                                    ৳{ticket.price}
                                </span>
                            </p>

                            <Link to={`/tickets/${ticket._id}`}>
                                <button className="btn btn-primary w-full">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AllTickets;
