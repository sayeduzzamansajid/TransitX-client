// src/Pages/Dashboard/User/TransactionHistory.jsx
// route example: /dashboard/user/transactions

const TransactionHistory = () => {
  // later: load from backend (Stripe payments)
  const transactions = [
    {
      _id: "t1",
      transactionId: "pi_1XXYZZ123",
      ticketTitle: "Dhaka to Chattogram Express",
      amount: 2400,
      paymentDate: "2025-12-18T14:20:00Z",
    },
    {
      _id: "t2",
      transactionId: "pi_1AABBCC456",
      ticketTitle: "Dhaka to Sylhet Intercity",
      amount: 900,
      paymentDate: "2025-12-10T19:05:00Z",
    },
  ];

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral">
          Transaction History
        </h1>
        <p className="text-sm text-neutral/70">
          List of all successful Stripe payments for your booked tickets.
        </p>
      </header>

      {transactions.length === 0 ? (
        <p className="text-sm text-neutral/70">
          You don&apos;t have any completed payments yet.
        </p>
      ) : (
        <div className="bg-base-200 rounded-2xl p-4 overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr className="text-xs text-neutral/70">
                <th>#</th>
                <th>Transaction ID</th>
                <th>Ticket Title</th>
                <th>Amount (৳)</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={trx._id} className="text-sm">
                  <td>{index + 1}</td>
                  <td className="font-mono text-xs">{trx.transactionId}</td>
                  <td>{trx.ticketTitle}</td>
                  <td className="font-semibold text-primary">
                    {trx.amount}
                  </td>
                  <td>
                    {new Date(trx.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TransactionHistory;
