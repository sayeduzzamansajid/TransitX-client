// src/Pages/Tickets/TicketDetails.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaBusAlt, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const getIcon = (type) => {
  switch (type) {
    case "Bus":
      return <FaBusAlt />;
    case "Train":
      return <FaTrain />;
    case "Plane":
    case "Flight":
      return <FaPlane />;
    case "Launch":
      return <FaShip />;
    default:
      return <FaBusAlt />;
  }
};

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { timeLeft, days, hours, minutes, seconds };
};

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  const departureISO = useMemo(
    () => (ticket?.departure ? ticket.departure : null),
    [ticket]
  );

  const { timeLeft, days, hours, minutes, seconds } = useCountdown(
    departureISO || new Date().toISOString()
  );

  const isDeparturePassed = timeLeft === 0;
  const noSeats = ticket?.quantity === 0;
  const maxQuantity = ticket?.quantity || 0;
  const isBookDisabled = isDeparturePassed || noSeats;

  const bookingMutation = useMutation({
    mutationFn: (payload) => axiosSecure.post("/bookings", payload),
    onSuccess: () => {
      setIsModalOpen(false);
      setQuantity(1);
      // you can replace with Swal/toast
      alert("Booking placed successfully and set to pending.");
    },
    onError: () => {
      alert("Failed to place booking. Try again.");
    },
  });

  const handleBookNow = () => {
    if (!user) {
      // redirect to login or show message
      alert("Please login to book tickets.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!ticket || !user) return;
    if (quantity < 1 || quantity > maxQuantity) return;

    const payload = {
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      bookingQuantity: quantity,
      unitPrice: ticket.price,
      totalPrice: ticket.price * quantity,
      status: "pending",
      sellerEmail: ticket.seller?.email,
      departure: ticket.departure,
    };

    bookingMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary" />
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load ticket: {error?.message || "Not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 lg:pt-28">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top big image + summary */}
        <div className="bg-base-200 rounded-3xl overflow-hidden shadow-md">
          <div className="relative">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
            <div className="absolute left-4 right-4 bottom-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3 text-white">
              <div>
                <span className="badge badge-primary mb-2">
                  {ticket.transportType}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {ticket.title}
                </h1>
                <p className="text-xs md:text-sm text-gray-200 mt-1">
                  {ticket.fromDistrict} → {ticket.toDistrict}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-xl md:text-2xl">
                  {getIcon(ticket.transportType)}
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-200">Starting from</p>
                  <p className="text-lg md:text-xl font-semibold">
                    ৳ {ticket.price} / seat
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom info rows */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Departure */}
            <div className="bg-base-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="text-primary text-xl">{getIcon(ticket.transportType)}</div>
              <div>
                <p className="text-xs text-neutral/60">Departure</p>
                <p className="text-sm font-semibold">
                  {new Date(ticket.departure).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Seats */}
            <div className="bg-base-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
              <div className="text-primary text-xl">💺</div>
              <div>
                <p className="text-xs text-neutral/60">Available Seats</p>
                <p className="text-sm font-semibold">{ticket.quantity}</p>
              </div>
            </div>

            {/* Booking summary */}
            <div className="bg-base-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-3">
              <div>
                <p className="text-sm font-semibold mb-1">
                  Booking Summary
                </p>
                <p className="text-xs text-neutral/60">
                  Price: <span className="font-semibold">৳ {ticket.price}</span>
                </p>
                <p className="text-xs text-neutral/60">
                  Transport:{" "}
                  <span className="font-semibold">
                    {ticket.transportType}
                  </span>
                </p>
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleBookNow}
                disabled={isBookDisabled || bookingMutation.isLoading}
              >
                {isDeparturePassed
                  ? "Departure Passed"
                  : noSeats
                  ? "Sold Out"
                  : bookingMutation.isLoading
                  ? "Processing..."
                  : "Book Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Countdown card */}
        <div className="bg-base-200 rounded-3xl p-4 md:p-6 shadow-sm">
          <p className="text-sm font-semibold mb-2">Countdown</p>
          {isDeparturePassed ? (
            <p className="text-sm text-red-500">
              Departure time has already passed.
            </p>
          ) : (
            <p className="text-xl md:text-2xl font-bold text-primary">
              {days}d {hours}h {minutes}m {seconds}s
            </p>
          )}
        </div>

        {/* Perks / extra info */}
        <div className="bg-base-200 rounded-3xl p-4 md:p-6 shadow-sm">
          <p className="text-sm font-semibold mb-2">Perks</p>
          <p className="text-xs text-neutral/70">
            {ticket.perks && ticket.perks.length > 0
              ? ticket.perks.join(", ")
              : "Standard facilities included."}
          </p>
        </div>
      </div>

      {/* Booking modal */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Book: {ticket.title}
            </h3>
            <p className="text-xs text-neutral/70 mb-4">
              Available seats: {ticket.quantity}. Booking quantity cannot be
              greater than ticket quantity.
            </p>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <label className="form-control">
                <span className="label-text text-sm">Quantity</span>
                <input
                  type="number"
                  min={1}
                  max={maxQuantity}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(maxQuantity, Number(e.target.value) || 1)))
                  }
                  className="input input-bordered"
                  required
                />
                <span className="label-text-alt text-xs text-neutral/60">
                  Max {maxQuantity} seats.
                </span>
              </label>

              <p className="text-sm">
                Total:{" "}
                <span className="font-semibold text-primary">
                  ৳ {ticket.price * quantity}
                </span>
              </p>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                  disabled={bookingMutation.isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={bookingMutation.isLoading}
                >
                  {bookingMutation.isLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default TicketDetails;
