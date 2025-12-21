// src/Pages/Dashboard/Vendor/RevenueOverview.jsx

const RevenueOverview = () => {
  // later: get stats + chart data from backend
  const stats = {
    totalRevenue: 75000,
    totalTicketsSold: 120,
    totalTicketsAdded: 15,
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Revenue Overview
        </h1>
        <p className="text-sm text-neutral/70">
          High-level summary of your sales performance on TransitX.
        </p>
      </header>

      {/* Top cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-base-200 rounded-2xl p-4">
          <p className="text-xs text-neutral/60 mb-1 uppercase tracking-wide">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-primary">
            ৳ {stats.totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-base-200 rounded-2xl p-4">
          <p className="text-xs text-neutral/60 mb-1 uppercase tracking-wide">
            Total Tickets Sold
          </p>
          <p className="text-2xl font-bold text-neutral">
            {stats.totalTicketsSold}
          </p>
        </div>
        <div className="bg-base-200 rounded-2xl p-4">
          <p className="text-xs text-neutral/60 mb-1 uppercase tracking-wide">
            Total Tickets Added
          </p>
          <p className="text-2xl font-bold text-neutral">
            {stats.totalTicketsAdded}
          </p>
        </div>
      </div>

      {/* Chart placeholders */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-base-200 rounded-2xl p-4 h-64 flex items-center justify-center">
          <p className="text-sm text-neutral/60">
            Line / bar chart for revenue over time (connect Recharts/Chart.js
            later).
          </p>
        </div>
        <div className="bg-base-200 rounded-2xl p-4 h-64 flex items-center justify-center">
          <p className="text-sm text-neutral/60">
            Pie / bar chart for tickets sold per transport type.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RevenueOverview;
