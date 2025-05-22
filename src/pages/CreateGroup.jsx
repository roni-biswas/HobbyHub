import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const categories = [
  "Drawing & Painting",
  "Photography",
  "Video Gaming",
  "Fishing",
  "Running",
  "Cooking",
  "Reading",
  "Writing",
];

const CreateGroup = () => {
  const { user } = use(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [user?.email]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const groupData = Object.fromEntries(formData.entries());

    // create groups in db
    fetch("http://localhost:3000/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Group Successfully Created!",
            icon: "success",
            draggable: true,
          });
          form.reset();
          navigate("/my-group");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 pt-32">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create a New Hobby Group
        </h2>
        <form
          onSubmit={handleCreateGroup}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Group Name
            </label>
            <input
              type="text"
              name="group_name"
              placeholder="Enter group name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Hobby Category
            </label>
            <select name="category" className="select select-bordered w-full">
              <option disabled selected>
                Select a category
              </option>
              {categories.map((category, idx) => (
                <option key={idx} defaultValue={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control md:col-span-2">
            <div className="flex flex-col">
              <label className="label font-semibold text-base-300">
                Description
              </label>
              <input
                type="text"
                name="description"
                className="input input-bordered w-full py-0"
                placeholder="Write a short description..."
              ></input>
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Meeting Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Max Members
            </label>
            <input
              type="number"
              name="max_members"
              placeholder="e.g. 10"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Start Date
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Image URL
            </label>
            <input
              type="url"
              name="photo_url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={userData?.name || "Guest"}
              readOnly
              className="input input-bordered bg-gray-100 text-gray-500 w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={userData?.email || "guest@example.com"}
              readOnly
              className="input input-bordered bg-gray-100 text-gray-500 w-full"
            />
          </div>

          <div className="form-control md:col-span-2 mt-4">
            <button type="submit" className="btn btn-secondary w-full text-lg">
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
