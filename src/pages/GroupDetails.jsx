import { useLoaderData } from "react-router";

const GroupDetails = () => {
  const {
    group_name,
    description,
    category,
    date,
    location,
    max_members,
    photo_url,
  } = useLoaderData() || {};

  const today = new Date();
  const groupStartDate = new Date(date);
  const isPastStartDate = today > groupStartDate;

  return (
    <div className="min-h-screen px-4 py-24 pt-32 ">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={photo_url}
            alt={group_name}
            className="w-full md:w-72 h-72 object-cover rounded-xl shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {group_name}
            </h1>
            <span className="text-sm bg-indigo-100 text-secondary font-medium inline-block px-3 py-1 rounded-full mb-4">
              {category}
            </span>
            <p className="text-gray-700 text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Group Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <strong>📍 Meeting Location:</strong> <br />
            {location}
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <strong>👥 Max Members:</strong> <br />
            {max_members}
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <strong>🗓️ Start Date:</strong> <br />
            {date}
          </div>
        </div>

        {/* Join Button */}
        <div className="text-center pt-4">
          <button
            className={`btn text-base px-6 py-2 rounded-xl transition 
          ${
            isPastStartDate
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "btn-secondary text-white hover:scale-105"
          }`}
            disabled={isPastStartDate}
          >
            {isPastStartDate ? "Group Already Started" : "Join Group"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
