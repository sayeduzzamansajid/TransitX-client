const popularRoutes = [
  {
    from: "Dhaka",
    to: "Chattogram",
    transport: "Bus",
    price: "৳1200",
  },
  {
    from: "Dhaka",
    to: "Sylhet",
    transport: "Train",
    price: "৳900",
  },
  {
    from: "Dhaka",
    to: "Cox’s Bazar",
    transport: "Plane",
    price: "৳4500",
  },
  {
    from: "Barishal",
    to: "Dhaka",
    transport: "Launch",
    price: "৳700",
  },
];

export default function PopularRoutes() {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl text-primary font-bold text-center mb-10">
          Popular Routes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <div className="card-body text-center">
                <h3 className="font-semibold text-lg">
                  {route.from} → {route.to}
                </h3>
                <p className="text-sm text-gray-500">
                  Transport: {route.transport}
                </p>
                <p className="text-primary font-bold">{route.price}</p>
                <button className="btn btn-outline btn-sm mt-3">
                  View Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
