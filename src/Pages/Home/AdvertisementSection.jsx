import { Link } from "react-router";


const advertisedTickets = [
  {
    _id: "1",
    title: "Dhaka → Cox’s Bazar",
    image: "https://i.ibb.co.com/vvrYv56F/pic4.jpg",
    price: 1200,
    quantity: 25,
    transportType: "Bus",
    perks: ["AC", "WiFi", "Recliner Seat"],
  },
  {
    _id: "2",
    title: "Dhaka → Chattogram",
    image: "https://i.ibb.co.com/gZ2XsH4s/pic0.jpg",
    price: 900,
    quantity: 40,
    transportType: "Train",
    perks: ["AC", "Dining"],
  },
  {
    _id: "3",
    title: "Dhaka → Sylhet",
    image: "https://i.ibb.co.com/0VRvWW8W/pic-2.jpg",
    price: 4500,
    quantity: 12,
    transportType: "Plane",
    perks: ["Business Class", "Meals"],
  },
  {
    _id: "4",
    title: "Barishal → Dhaka",
    image: "https://i.ibb.co.com/SD56mdD2/pic2.jpg",
    price: 700,
    quantity: 30,
    transportType: "Launch",
    perks: ["Cabin", "Dinner"],
  },
  {
    _id: "5",
    title: "Dhaka → Rajshahi",
    image: "https://i.ibb.co.com/FbThkFv6/pic1.jpg",
    price: 800,
    quantity: 20,
    transportType: "Bus",
    perks: ["AC", "Charging Port"],
  },
  {
    _id: "6",
    title: "Dhaka → Khulna",
    image: "https://i.ibb.co.com/vCKwkKB6/pic3.jpg",
    price: 950,
    quantity: 35,
    transportType: "Train",
    perks: ["Sleeper", "Washroom"],
  },
];


// useEffect(() => {
//   fetch("/tickets/advertised")
//     .then(res => res.json())
//     .then(data => setTickets(data));
// }, []);



const AdvertisementSection = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl text-primary font-bold text-center text-primary mb-12">
          Advertised Tickets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisedTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition"
            >
              <figure>
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="font-semibold text-lg">
                  {ticket.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Transport: {ticket.transportType}
                </p>

                <p className="font-bold text-primary">
                  ৳ {ticket.price} / unit
                </p>

                <p className="text-sm">
                  Available: {ticket.quantity}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {ticket.perks.map((perk, idx) => (
                    <span
                      key={idx}
                      className="badge badge-outline"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                <div className="card-actions mt-4">
                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
