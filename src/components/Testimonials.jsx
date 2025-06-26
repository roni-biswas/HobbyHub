const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Painter & Art Lover",
    feedback:
      "Joining HobbyHub has completely changed my creative journey. I've met so many talented artists and learned techniques I never imagined!",
    avatar: "https://i.ibb.co/1tw1rmNr/download.jpg",
  },
  {
    name: "Farhan Ahmed",
    role: "Gaming Enthusiast",
    feedback:
      "Being part of a gaming group helped me improve my strategy and make amazing friends who love the same games!",
    avatar: "https://i.ibb.co/zWwRPbTw/download-3.jpg",
  },
  {
    name: "Nusrat Jahan",
    role: "Writer & Blogger",
    feedback:
      "The writing group at HobbyHub motivated me to finally start my blog. Weekly sessions keep me inspired and disciplined.",
    avatar: "https://i.ibb.co/MknGqM3m/download-1.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="px-4 py-16 max-w-screen-7xl mx-auto md:px-12 lg:px-16 xl:px-24 bg-base-200 dark:bg-base-100 transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          💬 What Our Members Say
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Real stories from people who discovered joy, community, and growth
          through HobbyHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            data-aos="fade-down"
            data-aos-delay={index * 50}
            data-aos-duration="800"
            className="bg-indigo-50 border border-accent rounded-xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition duration-300"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-primary">{t.name}</h3>
            <p className="text-sm text-secondary mb-3">{t.role}</p>
            <p className="text-black text-sm italic">"{t.feedback}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
