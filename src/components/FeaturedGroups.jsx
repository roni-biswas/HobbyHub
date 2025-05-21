import React from "react";
import { Fade } from "react-awesome-reveal";

const sampleGroups = [
  {
    _id: "1",
    name: "Book Club",
    description:
      "A group for book lovers to discuss and share their favorite reads.",
    imageURL: "https://i.ibb.co/LDjhmH9t/photo-1512820790803-83ca734da794.jpg",
  },
  {
    _id: "2",
    name: "Photography Lovers",
    description: "Share photos and tips for photography enthusiasts.",
    imageURL: "https://i.ibb.co/ycQFXPR4/photo-1506744038136-46273834b3fb.jpg",
  },
  {
    _id: "3",
    name: "Hiking Crew",
    description: "Join us for weekly hikes and nature walks.",
    imageURL:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=60",
  },
  {
    _id: "4",
    name: "Painting Circle",
    description: "Express your creativity with fellow painters.",
    imageURL:
      "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=400&q=60",
  },
  {
    _id: "5",
    name: "Cooking Club",
    description: "Swap recipes and cooking tips every week.",
    imageURL:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=60",
  },
  {
    _id: "6",
    name: "Video Gamers",
    description: "Find teammates and share your favorite games.",
    imageURL:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=60",
  },
];

function FeaturedGroups() {
  return (
    <div className="py-24 max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
      <h2 className="text-2xl font-bold mb-4">Featured Groups</h2>
      <Fade damping>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sampleGroups.map((group) => (
            <div
              key={group._id}
              className="border rounded shadow hover:shadow-lg transition p-4"
            >
              <img
                src={group.imageURL}
                alt={group.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="font-semibold mt-3">{group.name}</h3>
              <p className="mt-1 text-gray-600">{group.description}</p>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}

export default FeaturedGroups;
