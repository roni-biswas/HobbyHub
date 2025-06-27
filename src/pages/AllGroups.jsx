import { useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router";

const sortOptions = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "date-desc", label: "Date (Newest)" },
  { value: "date-asc", label: "Date (Oldest)" },
];

const AllGroups = () => {
  const groups = useLoaderData();
  const [sortBy, setSortBy] = useState("name-asc");
  const [filterCat, setFilterCat] = useState("all");
  const [viewMode, setViewMode] = useState("card");

  const categories = useMemo(() => {
    const unique = new Set(groups.map((g) => g.category));
    return ["all", ...Array.from(unique)];
  }, [groups]);

  const visibleGroups = useMemo(() => {
    let data = [...groups];
    if (filterCat !== "all")
      data = data.filter((g) => g.category === filterCat);
    switch (sortBy) {
      case "name-asc":
        data.sort((a, b) => a.group_name.localeCompare(b.group_name));
        break;
      case "name-desc":
        data.sort((a, b) => b.group_name.localeCompare(a.group_name));
        break;
      case "date-desc":
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    return data;
  }, [groups, filterCat, sortBy]);

  return (
    <div className="max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 py-8 bg-base-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          All Hobby Groups
        </h1>
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${
              viewMode === "card" ? "btn-secondary" : ""
            }`}
            onClick={() => setViewMode("card")}
          >
            🗂 Card
          </button>
          <button
            className={`btn btn-sm ${
              viewMode === "table" ? "btn-secondary" : ""
            }`}
            onClick={() => setViewMode("table")}
          >
            📊 Table
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full md:w-56"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="select select-bordered w-full md:w-56"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {visibleGroups.length === 0 ? (
        <p className="text-center text-gray-500">No groups found.</p>
      ) : viewMode === "table" ? (
        <div className="overflow-x-auto">
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
              {visibleGroups.map((group, index) => (
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
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleGroups.map((group) => (
            <div
              key={group._id}
              className="card bg-base-100 shadow hover:shadow-lg transition hover:scale-[1.02]"
            >
              <figure className="p-4">
                <img
                  src={group.photo_url}
                  alt={group.group_name}
                  className="rounded-xl w-full h-40 object-cover"
                />
              </figure>
              <div className="card-body pt-0">
                <h2 className="card-title text-primary">{group.group_name}</h2>
                <p className="text-sm text-secondary mb-1">{group.category}</p>
                <p className="text-sm">
                  <strong>📍</strong> {group.location}
                </p>
                <p className="text-xs text-gray-500">
                  Max Members: {group.max_members}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Start: {group.date}
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/group-details/${group._id}`}>
                    <button className="btn btn-sm btn-secondary">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
