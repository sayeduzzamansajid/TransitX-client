// src/Pages/About/About.jsx
const About = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 pt-28">
      {/* Intro */}
      <div className="bg-base-200 rounded-2xl p-8 shadow-sm  mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-3">
          About TransitX
        </h1>
        <p className="text-sm md:text-base text-neutral/80 mb-3">
          TransitX is a modern online ticket booking platform where you can
          discover and book tickets for bus, train, launch, and flights from
          one place.
        </p>
        <p className="text-sm md:text-base text-neutral/80">
          Our goal is to make travel planning simple for everyone by connecting
          travelers, vendors, and admins through a single, secure dashboard
          system.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-base-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral mb-2">
            For travelers
          </h2>
          <p className="text-sm text-neutral/80">
            Search routes, compare prices, book tickets, and track booking
            status from your personal dashboard.
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral mb-2">
            For vendors
          </h2>
          <p className="text-sm text-neutral/80">
            Add tickets, manage booking requests, update availability, and
            monitor revenue with clear charts and tables.
          </p>
        </div>

        <div className="bg-base-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral mb-2">
            For admins
          </h2>
          <p className="text-sm text-neutral/80">
            Approve tickets, manage users and roles, control advertisements,
            and keep the platform safe from fraud.
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 bg-base-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral mb-2">
          Our mission
        </h2>
        <p className="text-sm text-neutral/80">
          TransitX is built as a MERN-based learning project focused on clean
          UI, secure authentication, and real-world booking workflows that are
          close to a production-ready system.
        </p>
      </div>
    </section>
  );
};

export default About;
