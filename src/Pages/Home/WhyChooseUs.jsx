import { FaShieldAlt, FaClock, FaTicketAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    title: "Secure Booking",
    description: "Your payments and personal data are fully protected.",
  },
  {
    icon: <FaClock className="text-4xl text-primary" />,
    title: "Real-Time Availability",
    description: "Get instant updates on ticket availability and pricing.",
  },
  {
    icon: <FaTicketAlt className="text-4xl text-primary" />,
    title: "Multiple Transport Options",
    description: "Bus, Train, Launch & Flight tickets in one platform.",
  },
  {
    icon: <FaHeadset className="text-4xl text-primary" />,
    title: "24/7 Support",
    description: "Our support team is always ready to help you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-xl transition text-center"
            >
              <div className="card-body items-center">
                {feature.icon}
                <h3 className="font-semibold text-lg mt-4">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
