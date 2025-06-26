const WhyJoinGroup = () => {
  const benefits = [
    {
      icon: "🤝",
      title: "Meet Like-minded People",
      description:
        "Connect with people who share the same passions and hobbies as you.",
    },
    {
      icon: "🎯",
      title: "Stay Motivated",
      description:
        "Being part of a group keeps you inspired, committed, and excited.",
    },
    {
      icon: "📚",
      title: "Learn & Grow",
      description:
        "Gain new skills, tips, and ideas through group workshops and discussions.",
    },
    {
      icon: "🌐",
      title: "Expand Your Network",
      description:
        "Build lasting relationships and expand your social or professional circle.",
    },
    {
      icon: "🎉",
      title: "Have Fun!",
      description:
        "Enjoy fun group activities, games, meetups, and special hobby events.",
    },
    {
      icon: "🧠",
      title: "Boost Mental Health",
      description:
        "Hobbies help relieve stress and improve your emotional well-being.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-indigo-300 to-white px-4 py-14 md:py-20">
      <div className="text-center max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
        <h2 className="text-xl md:text-2xl text-gray-950 font-bold mb-4">
          🌟 Why Join a Hobby Group?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-12">
          Whether you're looking to make new friends, improve your skills, or
          just have fun, joining a hobby group brings countless benefits to your
          personal and social life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-indigo-200 border border-indigo-100 transition hover:scale-105"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinGroup;
