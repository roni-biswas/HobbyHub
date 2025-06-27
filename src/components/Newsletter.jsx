import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_base_url}/newsletter`,
        {
          email: data.email,
        }
      );

      if (response.status === 200 || response.data.success) {
        Swal.fire({
          title: "Subscribed!",
          text: "You’ve successfully subscribed to our newsletter.",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
        reset();
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
      console.error(error);
    }
  };

  return (
    <section className="bg-base-200 py-16 px-4 md:px-12 lg:px-16 xl:px-24 transition-colors duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          📬 Subscribe to Our Newsletter
        </h2>
        <p className="text-base-content/70 mb-8">
          Stay updated with new hobby groups, tips, and community highlights!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-[300px] text-gray-300"
          />
          <button type="submit" className="btn btn-secondary w-full sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
