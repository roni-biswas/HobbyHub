import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_base_url}/dashboard/overview?email=${
          user?.email
        }`
      )
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-200 rounded-lg p-4 shadow-md text-center">
          <p className="text-sm text-gray-500">Total Groups</p>
          <h3 className="text-3xl font-bold">{stats.totalGroups || 0}</h3>
        </div>
        <div className="bg-base-200 rounded-lg p-4 shadow-md text-center">
          <p className="text-sm text-gray-500">Groups Joined</p>
          <h3 className="text-3xl font-bold">{stats.groupsJoined || 0}</h3>
        </div>
        <div className="bg-base-200 rounded-lg p-4 shadow-md text-center">
          <p className="text-sm text-gray-500">Active Members</p>
          <h3 className="text-3xl font-bold">{stats.activeMembers || 0}</h3>
        </div>
        <div className="bg-base-200 rounded-lg p-4 shadow-md text-center">
          <p className="text-sm text-gray-500">Pending Invites</p>
          <h3 className="text-3xl font-bold">{stats.pendingInvites || 0}</h3>
        </div>
      </div>

      <div className="mt-10 bg-base-200 rounded-lg p-6 shadow-md">
        <h4 className="text-xl font-semibold mb-2">User Info</h4>
        <p>
          <span className="font-medium">Name:</span> {user?.displayName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user?.email}
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
