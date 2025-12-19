// src/Pages/Contact/Contact.jsx
const Contact = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr] items-start pt-16">
        {/* Left: form */}
        <div className="bg-base-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
            Contact Us
          </h1>
          <p className="text-sm text-neutral/70 mb-6">
            Have questions about your tickets, payments, or routes? Send a
            message and the TransitX team will get back to you soon.
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neutral">
                  Full name
                </span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neutral">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neutral">
                  Subject
                </span>
              </label>
              <input
                type="text"
                placeholder="Booking issue, payment, feedback…"
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            {/* Message */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-neutral">
                  Message
                </span>
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here"
                className="textarea textarea-bordered w-full bg-base-100 resize-none"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Send message
            </button>
          </form>
        </div>

        {/* Right: info */}
        <aside className="space-y-6">
          <div className="bg-base-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral mb-3">
              Support details
            </h2>
            <ul className="space-y-2 text-sm text-neutral/80">
              <li>
                <span className="font-medium">Email:</span>{" "}
                support@transitx.com
              </li>
              <li>
                <span className="font-medium">Phone:</span> +880 1XXX-XXXXXX
              </li>
              <li>
                <span className="font-medium">Facebook:</span> fb.com/transitx
              </li>
            </ul>
          </div>

          <div className="bg-base-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral mb-3">
              Service hours
            </h2>
            <p className="text-sm text-neutral/80">
              Our team is available 9:00 AM – 10:00 PM (GMT+6) for chat and
              email support on all working days.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
