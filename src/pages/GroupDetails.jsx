const GroupDetails = () => {
  // Static dummy group data
  const group = {
    id: "1",
    name: "Creative Artists",
    category: "Drawing & Painting",
    description:
      "Join our group of passionate artists who love to explore different painting techniques, sketching styles, and color theories. We meet weekly to create, share, and grow together.",
    location: "Dhaka Art Center",
    maxMembers: 25,
    startDate: "2025-06-01",
    image: "https://i.ibb.co/LDjhmH9t/photo-1512820790803-83ca734da794.jpg",
  };

  return (
    <div className="min-h-screen px-4 py-24 pt-32 ">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={group.image}
            alt={group.name}
            className="w-full md:w-72 h-72 object-cover rounded-xl shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {group.name}
            </h1>
            <span className="text-sm bg-indigo-100 text-secondary font-medium inline-block px-3 py-1 rounded-full mb-4">
              {group.category}
            </span>
            <p className="text-gray-700 text-base leading-relaxed">
              {group.description}
            </p>
          </div>
        </div>

        {/* Group Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <strong>📍 Meeting Location:</strong> <br />
            {group.location}
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <strong>👥 Max Members:</strong> <br />
            {group.maxMembers}
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <strong>🗓️ Start Date:</strong> <br />
            {group.startDate}
          </div>
        </div>

        {/* Join Button */}
        <div className="text-center pt-4">
          <button className="btn btn-secondary text-white text-base px-6 py-2 rounded-xl hover:scale-105 transition">
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
