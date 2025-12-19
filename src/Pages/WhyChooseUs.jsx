import { FaBusAlt, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const WhyChooseUs = () => {
    return (
        <div className="min-h-screen bg-base-100 py-16 lg:pt-28 shadow-2xl border-2 border-gray-200 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h2 className="text-4xl font-bold text-center mb-4">
                    Why Choose <span className="text-primary">Transit</span><span className="text-[#9CA3AF]">X</span>

                </h2>
                <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
                    TransitX brings all major transport options into one reliable platform, so you can plan, compare, and book your journey without confusion, delays, or hidden costs.

                </p>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Text */}
                    <div className="space-y-5">
                        <h3 className="text-2xl font-semibold">
                            Our Mission
                        </h3>
                        <p className="text-gray-600">
                            Our mission is to remove complexity from travel booking. TransitX focuses on speed, accuracy, and reliability—so users can book tickets confidently, avoid middlemen, and access verified transport services from a single, secure platform.

                        </p>

                        <h3 className="text-2xl font-semibold">
                            Why Choose TransitX?
                        </h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>One platform for bus, train, launch, and flight tickets</li>
                            <li>Verified operators with transparent pricing</li>
                            <li>Real-time availability and instant confirmation</li>
                            <li>Simple booking flow with dependable customer support</li>
                        </ul>

                    </div>

                    {/* Transport Icons */}
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="bg-base-200 p-6 rounded-xl shadow">
                            <FaBusAlt className="text-4xl text-primary mx-auto mb-3" />
                            <p className="font-medium">Bus Tickets</p>
                        </div>
                        <div className="bg-base-200 p-6 rounded-xl shadow">
                            <FaTrain className="text-4xl text-primary mx-auto mb-3" />
                            <p className="font-medium">Train Tickets</p>
                        </div>
                        <div className="bg-base-200 p-6 rounded-xl shadow">
                            <FaPlane className="text-4xl text-primary mx-auto mb-3" />
                            <p className="font-medium">Flight Tickets</p>
                        </div>
                        <div className="bg-base-200 p-6 rounded-xl shadow">
                            <FaShip className="text-4xl text-primary mx-auto mb-3" />
                            <p className="font-medium">Launch Tickets</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
