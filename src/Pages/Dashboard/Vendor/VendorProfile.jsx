// src/Pages/Dashboard/Vendor/VendorProfile.jsx

const VendorProfile = () => {
  // later: get from auth / backend
  const vendor = {
    name: "Demo Vendor",
    email: "vendor@example.com",
    role: "vendor",
    photoURL: "https://i.pravatar.cc/150?img=8",
    company: "TransitX Partner",
    joinedAt: "2025-01-05",
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Vendor Profile
        </h1>
        <p className="text-sm text-neutral/70">
          Your public information as a ticket vendor on TransitX.
        </p>
      </header>

      <div className="bg-base-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="shrink-0">
          <img
            src={vendor.photoURL}
            alt={vendor.name}
            className="w-24 h-24 rounded-full object-cover border border-base-300"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 w-full">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Name
            </p>
            <p className="font-semibold text-neutral">{vendor.name}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Email
            </p>
            <p className="font-semibold text-neutral">{vendor.email}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Company
            </p>
            <p className="font-semibold text-neutral">{vendor.company}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Role
            </p>
            <p className="font-semibold text-primary capitalize">
              {vendor.role}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral/60 mb-1">
              Member since
            </p>
            <p className="font-semibold text-neutral">{vendor.joinedAt}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorProfile;
