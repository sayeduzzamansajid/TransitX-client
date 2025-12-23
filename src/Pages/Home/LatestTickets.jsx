// src/Components/LatestTickets/LatestTickets.jsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LatestTickets = () => {
    const axiosSecure = useAxiosSecure()
    const {
        data: tickets = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["latest-tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets/latest");
            // only 6–8 latest tickets
            return res.data.slice(0, 8);
        },
    });

    if (isLoading) {
        return (
            <section className="py-10">
                <div className="flex justify-center">
                    <span className="loading loading-spinner text-primary" />
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-10">
                <p className="text-center text-sm text-red-500">
                    Failed to load latest tickets: {error.message}
                </p>
            </section>
        );
    }

    if (!tickets.length) {
        return null;
    }

    return (
        <section className="py-10 px-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* <div className="flex  md:flex-row md:items-center md:justify-between gap-2 w-7xl mx-auto border-2"> */}
                    <div>
                        <h2 className="text-2xl md:text-5xl font-bold text-primary text-center mb-3">
                            Latest Tickets
                        </h2>
                        <p className="text-sm text-center">
                            Recently approved tickets ready for booking.
                        </p>
                    </div>
                {/* </div> */}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {tickets.map((ticket) => (
                        <article
                            key={ticket._id}
                            className="bg-base-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                        >
                            <figure className="h-36 sm:h-40 w-full overflow-hidden">
                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover"
                                />
                            </figure>

                            <div className="p-4 flex-1 flex flex-col gap-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="text-sm md:text-base font-semibold text-neutral">
                                            {ticket.title}
                                        </h3>
                                        <p className="text-xs text-neutral/70 mt-1">
                                            {ticket.fromDistrict} → {ticket.toDistrict}
                                        </p>
                                    </div>
                                    <span className="badge badge-primary text-[10px]">
                                        {ticket.transportType}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs mt-1">
                                    <span className="text-neutral/70">
                                        Qty:{" "}
                                        <span className="font-semibold">{ticket.quantity}</span>
                                    </span>
                                    <span className="font-semibold text-primary">
                                        ৳ {ticket.price}
                                        <span className="text-[10px] text-neutral/60">
                                            {" "}
                                            / seat
                                        </span>
                                    </span>
                                </div>

                                <p className="text-xs text-neutral/70">
                                    Perks:{" "}
                                    {ticket.perks && ticket.perks.length > 0
                                        ? ticket.perks.join(", ")
                                        : "Standard"}
                                </p>

                                <div className="mt-2">
                                    <p className="text-[11px] text-neutral/60">
                                        Departure:{" "}
                                        <span className="font-medium">
                                            {new Date(ticket.departure).toLocaleString()}
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-auto pt-3">
                                    <Link to={`/tickets/${ticket._id}`}>
                                        <button className="btn btn-primary btn-sm w-full">
                                            See Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestTickets;
