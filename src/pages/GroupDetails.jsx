import { use, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const GroupDetails = () => {
  const { user } = use(AuthContext);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const navigate = useNavigate();
  const {
    group_name,
    description,
    category,
    date,
    location,
    max_members,
    photo_url,
  } = useLoaderData() || {};

  useEffect(() => {
    if (user?.email && group_name) {
      fetch(
        `${import.meta.env.VITE_base_url}/is-joined?email=${
          user.email
        }&group_name=${group_name}`
      )
        .then((res) => res.json())
        .then((data) => setAlreadyJoined(data.joined));
    }
  }, [user?.email, group_name]);

  const today = new Date();
  const groupStartDate = new Date(date);
  const isPastStartDate = today > groupStartDate;

  const handleJoinGroup = () => {
    if (!user) {
      Swal.fire({
        title: "Please log in to join the group",
        icon: "warning",
        confirmButtonText: "Log In",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const joinData = {
      group_name,
      date: todayDate, // Use today's date instead of group's start date
      email: user.email,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    };

    fetch(`${import.meta.env.VITE_base_url}/join-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.insertedId) {
          Swal.fire({
            title: "Successfully joined the group!",
            icon: "success",
            confirmButtonText: "Go to My Groups",
          }).then(() => {
            navigate(`/dashboard/my-groups`);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to join group.",
          });
        }
      })
      .catch((err) => {
        console.error("Error joining group:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="px-4 py-8">
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
            onClick={handleJoinGroup}
            disabled={isPastStartDate || alreadyJoined}
            className={`btn text-base px-6 py-2 rounded-xl transition 
    ${
      isPastStartDate || alreadyJoined
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "btn-secondary text-white hover:scale-105"
    }
  `}
          >
            {isPastStartDate
              ? "Group Already Started"
              : alreadyJoined
              ? "Already Joined"
              : "Join Group"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
