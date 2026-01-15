import React from 'react';

const AllTicketSkeleton = () => {
    const filteredTickets=['d','d','d','d','d','d','d','d']
    return (
        <div className="min-h-screen bg-base-100 py-16 px-4 pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          All Available Tickets
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Browse and book tickets from multiple transport services
        </p>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Route search */}
          <input
            type="text"
            placeholder="Search From → To (e.g. Dhaka Chittagong)"
            className="input input-bordered w-full md:flex-1"
          />

          {/* Transport filter */}
          <select
            className="select select-bordered w-full md:w-48"
          >
            <option value="All">All Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Flight</option>
            <option value="Launch">Launch</option>
          </select>

          {/* Price sort */}
          <select
            className="select select-bordered w-full md:w-48"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {/* Ticket Cards */}
        {
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredTickets.map((ticket) =><div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Image Placeholder */}
      <div className="h-48 w-full bg-gray-300"></div>
      <div className='hidden'>{ticket}</div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Title & Badge */}
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-blue-100 rounded-full w-16"></div>
        </div>

        {/* Route */}
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>

        {/* Seats & Price */}
        <div className="flex gap-4 mt-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Perks */}
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
        </div>

        {/* Departure Time */}
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>

        {/* Button */}
        <div className="h-10 bg-blue-200 rounded-lg w-full mt-6"></div>
      </div>
    </div>)}
          </div>
}
      </div>
    </div>
    );
};

export default AllTicketSkeleton;