import { Fade } from "react-awesome-reveal";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Painter & Art Lover",
    feedback:
      "Joining HobbyHub has completely changed my creative journey. I've met so many talented artists and learned techniques I never imagined!",
    avatar:
      "https://i.ibb.co/Myjd5gbB/christina-wocintechchat-com-SJv-Dxw0azqw-unsplash.jpg",
  },
  {
    name: "Farhan Ahmed",
    role: "Gaming Enthusiast",
    feedback:
      "Being part of a gaming group helped me improve my strategy and make amazing friends who love the same games!",
    avatar:
      "https://i.ibb.co/XMkSJVb/christian-buehner-DIt-Ylc26z-VI-unsplash.jpg",
  },
  {
    name: "Nusrat Jahan",
    role: "Writer & Blogger",
    feedback:
      "The writing group at HobbyHub motivated me to finally start my blog. Weekly sessions keep me inspired and disciplined.",
    avatar: "https://i.ibb.co/YvDdzdQ/ruben-ramirez-hglwfa4kj-o-unsplash.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-base-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl text-base-400 font-bold mb-4">
          💬 What Our Members Say
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Real stories from people who discovered joy, community, and growth
          through HobbyHub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Fade cascade damping={0.1}>
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-indigo-50 border border-accent rounded-xl shadow-sm p-6 flex flex-col items-center hover:shadow-md transition duration-300"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md mb-4"
                />
                <h3 className="text-lg font-semibold text-primary">{t.name}</h3>
                <p className="text-sm text-secondary mb-3">{t.role}</p>
                <p className="text-gray-600 text-sm italic">"{t.feedback}"</p>
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
