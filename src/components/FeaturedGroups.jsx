import { Fade } from "react-awesome-reveal";

const featuredGroups = [
  {
    id: 1,
    name: "Creative Artists",
    category: "Drawing & Painting",
    description: "Explore painting techniques and creative sketching together.",
    location: "Dhaka Art Center",
    maxMembers: 25,
    startDate: "2025-06-01",
    image: "https://i.ibb.co/ycQFXPR4/photo-1506744038136-46273834b3fb.jpg",
  },
  {
    id: 2,
    name: "Shutter Squad",
    category: "Photography",
    description: "Learn to capture moments like a pro and share editing tips.",
    location: "Chittagong Studio Hall",
    maxMembers: 30,
    startDate: "2025-06-05",
    image: "https://i.ibb.co/ycQFXPR4/photo-1506744038136-46273834b3fb.jpg",
  },
  {
    id: 3,
    name: "Gamers Unite",
    category: "Video Gaming",
    description: "Weekly online tournaments and team challenges.",
    location: "Online Discord Server",
    maxMembers: 50,
    startDate: "2025-06-02",
    image: "https://i.ibb.co/1rzpPvZ/gaming-group.jpg",
  },
  {
    id: 4,
    name: "Book Buffs",
    category: "Reading",
    description: "Join us to read, discuss, and share your favorite books.",
    location: "Sylhet Library Café",
    maxMembers: 15,
    startDate: "2025-06-03",
    image: "https://i.ibb.co/ycQFXPR4/photo-1506744038136-46273834b3fb.jpg",
  },
  {
    id: 5,
    name: "Writers' Retreat",
    category: "Writing",
    description: "A community for poets, bloggers, and storytellers.",
    location: "Rajshahi Literary Club",
    maxMembers: 20,
    startDate: "2025-06-06",
    image: "https://i.ibb.co/Xx4CL4f/writing-group.jpg",
  },
  {
    id: 6,
    name: "Catch & Release",
    category: "Fishing",
    description: "Relax, fish, and share your catch stories every weekend.",
    location: "Sundarbans River Side",
    maxMembers: 12,
    startDate: "2025-06-04",
    image: "https://i.ibb.co/M6xfpHc/fishing-group.jpg",
  },
];

const FeaturedGroups = () => {
  return (
    <section className="px-4 py-12 max-w-screen-7xl mx-auto md:px-12 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-8">
          🎯 Featured Hobby Groups
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Fade cascade damping={0.1}>
            {featuredGroups.map((group) => (
              <div
                key={group.id}
                className="card h-full flex flex-col bg-white shadow-lg hover:shadow-indigo-300 hover:scale-[1.02] transition rounded-xl overflow-hidden"
              >
                <figure>
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-52 object-cover"
                  />
                </figure>
                <div className="card-body p-5 space-y-2 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {group.name}
                    </h3>
                    <p className="text-sm text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full inline-block">
                      {group.category}
                    </p>
                    <p className="text-gray-700 text-sm">{group.description}</p>
                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                      <p>
                        <strong>📍 Location:</strong> {group.location}
                      </p>
                      <p>
                        <strong>👥 Max Members:</strong> {group.maxMembers}
                      </p>
                      <p>
                        <strong>🗓️ Start Date:</strong> {group.startDate}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <button className="btn btn-secondary btn-sm w-full">
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGroups;
