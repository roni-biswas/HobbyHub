import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const FeaturedGroups = () => {
  const [featuredGroups, setFeaturedGroups] = useState([]);
  const [joinedStatus, setJoinedStatus] = useState({}); // { group_name: true/false }
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch featured groups
  useEffect(() => {
    fetch(`${import.meta.env.VITE_base_url}/featured-groups`)
      .then((res) => res.json())
      .then((data) => setFeaturedGroups(data))
      .catch((err) => console.error("Error fetching featured groups:", err));
  }, []);

  // Check which groups user already joined
  useEffect(() => {
    if (!user?.email || featuredGroups.length === 0) return;

    // For all featured groups, check join status
    featuredGroups.forEach((group) => {
      fetch(
        `${import.meta.env.VITE_base_url}/is-joined?email=${
          user.email
        }&group_name=${encodeURIComponent(group.group_name)}`
      )
        .then((res) => res.json())
        .then((data) =>
          setJoinedStatus((prev) => ({
            ...prev,
            [group.group_name]: data.joined,
          }))
        )
        .catch(() =>
          setJoinedStatus((prev) => ({ ...prev, [group.group_name]: false }))
        );
    });
  }, [user?.email, featuredGroups]);

  const handleJoinGroup = (group_name) => {
    if (!user) {
      Swal.fire("You need to log in first!", "", "warning");
      return;
    }

    const todayDate = new Date().toISOString().split("T")[0];

    const joinData = {
      group_name,
      date: todayDate,
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
            confirmButtonText: "Go to all Groups",
          }).then(() => {
            navigate(`/all-groups`);
          });

          // Update joined status locally to disable the button immediately
          setJoinedStatus((prev) => ({ ...prev, [group_name]: true }));
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
        Swal.fire("Something went wrong.", "", "error");
      });
  };

  return (
    <section className="px-4 py-12 max-w-screen-7xl mx-auto md:px-12 lg:px-16 xl:px-24 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-8">
          🎯 Featured Hobby Groups
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredGroups.map((group) => (
            <div
              key={group._id}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={`${(group._id % 5) * 100}`} // stagger animation
              data-aos-easing="ease-in-out"
              className="card h-full flex flex-col bg-white shadow-lg hover:shadow-indigo-300 hover:scale-[1.02] transition rounded-xl overflow-hidden"
            >
              <figure>
                <img
                  src={group.photo_url}
                  alt={group.group_name}
                  className="w-full h-52 object-cover"
                />
              </figure>
              <div className="card-body p-5 space-y-2 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    {group.group_name}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {group.description.length > 60
                      ? `${group.description.slice(0, 60)}...`
                      : group.description}
                  </p>
                  <div className="text-xs text-gray-600 mt-2 space-y-1">
                    <p>
                      <strong>📍 Location:</strong> {group.location}
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <button
                    onClick={() => handleJoinGroup(group.group_name)}
                    disabled={user ? joinedStatus[group.group_name] : false} // disable only if user logged in & joined
                    className={`btn ${
                      user && joinedStatus[group.group_name]
                        ? "bg-gray-300 cursor-not-allowed"
                        : "btn-primary"
                    }`}
                  >
                    {user && joinedStatus[group.group_name]
                      ? "Already Joined"
                      : "Join Group"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGroups;
