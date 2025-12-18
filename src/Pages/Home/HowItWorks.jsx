import { FaSearch, FaTicketAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-4xl text-primary" />,
    title: "Search Tickets",
    description: "Find tickets by route, date, and transport type.",
  },
  {
    icon: <FaTicketAlt className="text-4xl text-primary" />,
    title: "Choose Your Seat",
    description: "Select your preferred ticket and quantity.",
  },
  {
    icon: <FaCreditCard className="text-4xl text-primary" />,
    title: "Make Payment",
    description: "Pay securely using Stripe payment gateway.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-primary" />,
    title: "Confirm Booking",
    description: "Get instant confirmation after payment.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition text-center"
            >
              <div className="card-body items-center">
                {step.icon}
                <h3 className="text-lg font-semibold mt-4">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
