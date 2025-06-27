import React from "react";

const teamMembers = [
  {
    name: "Roni Biswas",
    role: "Founder & Full-Stack Developer",
    photo: "https://avatars.githubusercontent.com/u/68504404?v=4",
  },
  {
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    photo: "https://i.ibb.co/MknGqM3m/download-1.jpg",
  },
  {
    name: "Farhan Ahmed",
    role: "Backend Engineer",
    photo: "https://i.ibb.co/zWwRPbTw/download-3.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 py-16 space-y-20 bg-base-200 overflow-x-hidden">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          About HobbyHub
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          HobbyHub is where creativity meets community. We help passionate
          individuals connect, collaborate, and grow through shared hobbies and
          interests.
        </p>
      </div>

      {/* Our Mission */}
      <section
        data-aos="zoom-out"
        data-aos-delay="100"
        data-aos-duration="800"
        className="bg-base-100 p-8 md:p-12 rounded-xl shadow-md text-center space-y-4"
      >
        <h2 className="text-3xl font-semibold text-secondary">
          🎯 Our Mission
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We aim to foster an inclusive platform that empowers people to explore
          their hobbies, form lasting connections, and unlock new opportunities.
          Whether you're into painting, gaming, or poetry — there's a group
          waiting for you!
        </p>
      </section>

      {/* Our Story */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div data-aos="fade-right" data-aos-delay="100" data-aos-duration="800">
          <h2 className="text-3xl font-semibold text-secondary mb-4">
            📖 Our Story
          </h2>
          <p className="text-gray-700">
            Founded in 2025, HobbyHub began as a small community of creatives
            looking for like-minded friends. As we grew, we realized the power
            of hobbies to connect hearts and minds. Today, we serve thousands of
            users who come together to learn, share, and grow through their
            passions.
          </p>
        </div>
        <img
          data-aos="fade-left"
          data-aos-delay="100"
          data-aos-duration="800"
          src="https://i.ibb.co/4RpSr2B8/productivity-thumb-5.webp"
          alt="Our story"
          className="w-full h-72 object-cover rounded-xl shadow-lg"
        />
      </section>

      {/* Our Team */}
      <section>
        <h2 className="text-3xl font-semibold text-secondary text-center mb-8">
          👥 Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-primary">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to find your people?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Join HobbyHub today and explore a world of creativity, community, and
          connection!
        </p>
        <a href="/all-groups">
          <button className="btn btn-secondary text-white px-8 text-lg">
            Explore Groups
          </button>
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
