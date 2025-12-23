import React from 'react';
import { FaBusAlt, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import { Link } from 'react-router';

const transportIcons = {
  Bus: <FaBusAlt />,
  Train: <FaTrain />,
  Plane: <FaPlane />,
  Launch: <FaShip />,
};
const TicketCard = ({ticket}) => {
    return (
        <div
                key={ticket._id}
                className="bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
              >
                <figure className="h-60 w-full overflow-hidden rounded-t-2xl">
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
    );
};

export default TicketCard;