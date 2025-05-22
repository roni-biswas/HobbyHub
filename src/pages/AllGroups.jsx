import React from "react";
import { Link, useLoaderData } from "react-router";

const AllGroups = () => {
  const groups = useLoaderData();

  return (
    <div className="max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 py-12 pt-32">
      <div className="px-4 py-10 ">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
          All Hobby Groups
        </h1>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="table table-zebra bg-white rounded-xl shadow-lg w-full">
            <thead className="bg-red-50 text-primary font-semibold">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Group Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Max Members</th>
                <th>Start Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr
                  key={group._id}
                  className={`even:bg-gray-800 even:text-white text-gray-800 
                        transition-all duration-200 
                        hover:bg-indigo-100 hover:even:bg-indigo-700 
                        hover:even:text-white hover:text-indigo-900 
                        cursor-pointer hover:scale-[1.01]`}
                >
                  <th>{index + 1}</th>
                  <td>
                    <div className="w-16 h-16 overflow-hidden rounded-lg shadow">
                      <img
                        src={group.photo_url}
                        alt={group.group_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="font-semibold">{group.group_name}</td>
                  <td>{group.category}</td>
                  <td>{group.location}</td>
                  <td>{group.max_members}</td>
                  <td>{group.date}</td>
                  <td>
                    <Link to={`/group-details/${group._id}`}>
                      <button className="btn btn-sm btn-secondary">
                        See More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl shadow-lg p-4 space-y-2 transition hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-20 h-20 rounded-lg object-cover shadow"
                />
                <div>
                  <h2 className="font-bold text-lg text-blue-600">
                    {group.name}
                  </h2>
                  <p className="text-sm text-gray-500">{group.category}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {group.location}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Max Members:</strong> {group.maxMembers}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Start Date:</strong> {group.startDate}
              </p>
              <Link to={`/group/${group.id}`}>
                <button className="btn btn-sm btn-primary mt-2">
                  See More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGroups;
