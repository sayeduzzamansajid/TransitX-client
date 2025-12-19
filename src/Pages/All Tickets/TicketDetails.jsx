import { useParams, Link } from "react-router";
import { FaBusAlt, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const dummyTicket = {
    id: "1",
    type: "Bus",
    route: "Dhaka → Chittagong",
    departureTime: "08:00 AM",
    arrivalTime: "02:00 PM",
    date: "25 Dec 2025",
    price: 1200,
    seatsAvailable: 24,
    operator: "Green Line Paribahan",
    boardingPoint: "Sayedabad Bus Terminal",
    droppingPoint: "Chittagong Terminal"
};

const getIcon = (type) => {
    switch (type) {
        case "Bus":
            return <FaBusAlt />;
        case "Train":
            return <FaTrain />;
        case "Flight":
            return <FaPlane />;
        case "Launch":
            return <FaShip />;
        default:
            return null;
    }
};

const TicketDetails = () => {
    const { id } = useParams(); // will be used after backend

    const ticket = dummyTicket; // 🔴 replace later
    // const [ticket, setTicket] = useState(null);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/tickets/${id}`)
    //         .then(res => res.json())
    //         .then(data => setTicket(data));
    // }, [id]);
    if (!ticket) return <p className="text-center">Loading...</p>;



    return (
        <div className="min-h-screen bg-base-100 py-16 px-4 lg:pt-28">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl text-primary">
                        {getIcon(ticket.type)}
                    </span>
                    <h2 className="text-3xl font-bold">
                        {ticket.route}
                    </h2>
                </div>

                {/* Main Card */}
                <div className="bg-base-200 p-8 rounded-2xl shadow-lg space-y-6">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-500">Transport Type</p>
                            <p className="font-semibold">{ticket.type}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Operator</p>
                            <p className="font-semibold">{ticket.operator}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Departure Time</p>
                            <p className="font-semibold">{ticket.departureTime}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Arrival Time</p>
                            <p className="font-semibold">{ticket.arrivalTime}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Journey Date</p>
                            <p className="font-semibold">{ticket.date}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Available Seats</p>
                            <p className="font-semibold">{ticket.seatsAvailable}</p>
                        </div>
                    </div>

                    {/* Boarding Info */}
                    <div className="border-t pt-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Boarding & Dropping
                        </h3>
                        <p className="text-gray-600">
                            <strong>Boarding Point:</strong> {ticket.boardingPoint}
                        </p>
                        <p className="text-gray-600">
                            <strong>Dropping Point:</strong> {ticket.droppingPoint}
                        </p>
                    </div>

                    {/* Price & Action */}
                    <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-2xl font-bold text-primary">
                            ৳ {ticket.price}
                        </p>

                        <Link to="/login">
                            <button className="btn btn-primary px-10">
                                Proceed to Booking
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TicketDetails;
