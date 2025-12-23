// src/Components/AdvertisementSection/AdvertisementSection.jsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure()
  const {
    data: advertisedTickets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertised-tickets-home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/advertised");
      return res.data; // already max 6 from backend
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      </section>
    );
  }

  if (isError || advertisedTickets.length === 0) {
    // no advertised tickets → hide section
    return null;
  }

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-primary mb-12">
          Advertised Tickets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition"
            >
              <figure>
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="font-semibold text-lg">{ticket.title}</h3>

                <p className="text-sm text-gray-500">
                  Transport: {ticket.transportType}
                </p>

                <p className="font-bold text-primary">
                  ৳ {ticket.price} / unit
                </p>

                <p className="text-sm">Available: {ticket.quantity}</p>

                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  {
                  ticket.perks?.map((perk, idx) => (
                    <span key={idx} className="badge badge-outline">
                      {perk}
                    </span>
                  ))}
                </div>

                <div className="card-actions mt-4">
                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
