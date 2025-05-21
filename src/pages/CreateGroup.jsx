import React from "react";

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

const CreateGroup = ({ user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl p-8 md:p-10 rounded-2xl w-full max-w-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-secondary mb-6">
          Create a New Hobby Group
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-semibold text-base-300 text-base-300">
              Group Name
            </label>
            <input
              type="text"
              placeholder="Enter group name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Hobby Category
            </label>
            <select className="select select-bordered w-full">
              <option disabled selected>
                Select a category
              </option>
              {categories.map((category, idx) => (
                <option key={idx}>{category}</option>
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
              placeholder="e.g. 10"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Start Date
            </label>
            <input type="date" className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label font-semibold text-base-300">
              Image URL
            </label>
            <input
              type="url"
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
              value={user?.name || "Guest"}
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
              value={user?.email || "guest@example.com"}
              readOnly
              className="input input-bordered bg-gray-100 text-gray-500 w-full"
            />
          </div>

          <div className="form-control md:col-span-2 mt-4">
            <button className="btn btn-primary w-full text-lg">
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
