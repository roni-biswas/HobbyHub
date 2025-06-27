import React, { use, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

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

const UpdateGroup = () => {
  const { user } = use(AuthContext);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_base_url}/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [user?.email]);

  const {
    _id,
    group_name,
    category,
    description,
    location,
    max_members,
    date,
    photo_url,
  } = useLoaderData();

  const handleUpdateGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedGroup = Object.fromEntries(formData.entries());

    // update user info in the db
    fetch(`${import.meta.env.VITE_base_url}/groupsById/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGroup),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Group Successfully Updated!",
            icon: "success",
            draggable: true,
          });
          navigate(`/dashboard/my-group/${users.email}`);
        }
      });
  };

  return (
    <div className="px-4 py-8 flex items-center justify-center min-h-screen">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Update Hobby Group
        </h2>
        <form
          onSubmit={handleUpdateGroup}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Group Name
            </label>
            <input
              type="text"
              name="group_name"
              defaultValue={group_name}
              placeholder="Enter group name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Hobby Category
            </label>
            <select
              name="category"
              defaultValue={category}
              className="select select-bordered w-full"
            >
              <option disabled>Select a category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
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
                defaultValue={description}
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
              defaultValue={location}
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
              defaultValue={max_members}
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
              name="data"
              defaultValue={date}
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
              defaultValue={photo_url}
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
              value={users?.name || "Guest"}
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
              value={users?.email || "guest@example.com"}
              readOnly
              className="input input-bordered bg-gray-100 text-gray-500 w-full"
            />
          </div>

          <div className="form-control md:col-span-2 mt-4">
            <button type="submit" className="btn btn-secondary w-full text-lg">
              Update Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGroup;
