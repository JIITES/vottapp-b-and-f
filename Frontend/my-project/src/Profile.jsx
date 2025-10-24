import React, { useContext, useEffect, useState } from "react";
import api from "./Axios"; // import your axios instance
import { AuthContext } from "./Context/Authcontext";

const Profile = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/Profile'); // token auto-added
        setUser(response.data.response);
        console.log("Profile data:", response.data);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2 className="text-amber-300">👤 User Profile</h2>
      <p className="text-amber-300">Name: {user.name}</p>
      <p className="text-amber-300">Aadhar Number: {user.adharnumber}</p>
      <p className="text-amber-300">Email: {user.email}</p>
    </div>
  );
};

export default Profile;
