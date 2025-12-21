// src/Components/Accordion/Accordion.jsx
const accordionItems = [
  {
    id: 1,
    title: "How does TransitX ticket booking work?",
    content:
      "Search your route, choose a ticket, and confirm the booking. Once the vendor accepts, you can complete payment securely from your dashboard.",
  },
  {
    id: 2,
    title: "Which transport types are supported?",
    content:
      "TransitX lets you book bus, train, launch, and flight tickets from one place, so you do not need to visit multiple websites.",
  },
  {
    id: 3,
    title: "Can I track my booking status?",
    content:
      "Yes. Every booking shows a live status like pending, accepted, rejected, or paid, along with a countdown until departure.",
  },
  {
    id: 4,
    title: "Is my payment information secure?",
    content:
      "Payments are processed via Stripe, and sensitive card details never touch the TransitX servers, ensuring bank‑level security.",
  },
  {
    id: 5,
    title: "What happens if the vendor rejects my request?",
    content:
      "If a vendor rejects your booking, the status changes to rejected and the countdown stops. You can then choose another ticket for the same route.",
  },
];

const Accordion = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-neutral/70">
          Quick answers about booking, payments, and how TransitX works.
        </p>
      </div>

      <div className="join join-vertical w-full bg-base-100">
        {accordionItems.map((item, index) => (
          <div
            key={item.id}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            {/* Only one open at a time using radio, as daisyUI accordion */}
            <input
              type="radio"
              name="transitx-accordion"
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-sm md:text-base font-semibold">
              {item.title}
            </div>
            <div className="collapse-content text-sm text-neutral/70">
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
