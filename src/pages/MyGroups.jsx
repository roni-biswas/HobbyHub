import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const groupData = useLoaderData();
  const [groups, setGroups] = useState([...groupData]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/groupsByEmail/${user.email}`)
        .then((res) => res.json())
        .then((data) => setGroups(data))
        .catch((err) => console.error("Failed to fetch groups:", err));
    }
  }, [user?.email]);

  // delete group
  const handleDeleteGroup = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // start deleting the options
        fetch(`http://localhost:3000/groupsById/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Group has been Deleted.",
                icon: "success",
              });

              // remove coffee from the state
              const remainingCoffees = groups.filter(
                (group) => group._id !== _id
              );
              setGroups(remainingCoffees);
            }
          });
      }
    });
  };

  return (
    <div className="max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 py-12 pt-32">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        All My Groups
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
              <th colSpan={3} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(groups) &&
              groups.map((group, index) => (
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
                  <td>
                    <Link
                      to={`/update-group/${group._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteGroup(group._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-6">
        {Array.isArray(groups) &&
          groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-xl shadow-lg p-4 space-y-2 transition hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={group.photo_url}
                  alt={group.group_name}
                  className="w-20 h-20 rounded-lg object-cover shadow"
                />
                <div>
                  <h2 className="font-bold text-lg text-blue-600">
                    {group.group_name}
                  </h2>
                  <p className="text-sm text-gray-500">{group.category}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {group.location}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Max Members:</strong> {group.max_members}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Start Date:</strong> {group.date}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Link to={`/group-details/${group._id}`}>
                  <button className="btn btn-sm btn-primary">See More</button>
                </Link>
                <Link
                  to={`/update-group/${group._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteGroup(group._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyGroups;
