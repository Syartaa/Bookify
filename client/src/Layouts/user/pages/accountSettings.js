"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios for API calls
import img from "../../../image/placeholder.png";

// Dummy components for button, text field, and alert
const Button = ({ variant, icon, onClick, children }) => (
  <button
    className={`btn-${variant} px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-all duration-200 
    ${variant === "neutral-secondary" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"}`}
    onClick={onClick}
  >
    {icon && <i className={`icon-${icon} mr-2`}></i>}
    {children}
  </button>
);

const TextField = ({ label, helpText, children }) => (
  <div className="flex flex-col w-full gap-2">
    {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
    {children}
    {helpText && <small className="text-xs text-gray-500">{helpText}</small>}
  </div>
);

TextField.Input = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
  />
);

const Alert = ({ variant, title, description, actions }) => (
  <div className={`alert-${variant} border-l-4 p-4 rounded-md bg-red-50 text-red-700`}>
    <strong className="block font-semibold">{title}</strong>
    <p className="text-sm">{description}</p>
    {actions}
  </div>
);

// Main Component
function AccountSettings() {
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the current user details from the backend
useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT is stored here
        },
      });
      setUserDetails(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (err) {
      setError("Failed to fetch user details.");
      console.error(err);
    }
  };

  fetchUserDetails();
}, []);

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Error updating password.");
      console.error(err);
    }
  };

  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="flex h-full w-full items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Account Header */}
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-800">Account Settings</h1>
          <p className="text-sm text-gray-500">Update your profile and personal details here</p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-xl font-medium text-gray-800">Profile</h2>
          <div className="flex items-center space-x-6">
            <img
              className="h-20 w-20 object-cover rounded-full"
              src={img}
              alt="Avatar"
            />
            <Button variant="neutral-secondary" icon="FeatherUpload" onClick={() => {}}>
              Upload
            </Button>
          </div>

          {/* Personal Details */}
          <div className="flex flex-col space-y-4 w-full">
            <TextField label="Name">
              <TextField.Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TextField>

            <TextField label="Email">
              <TextField.Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextField>
          </div>
        </div>

        {/* Password Section */}
        <div className="w-full space-y-6">
          <h2 className="text-xl font-medium text-gray-800">Change Password</h2>

          {error && (
            <Alert variant="error" title="Error" description={error} />
          )}

          {message && (
            <Alert variant="success" title="Success" description={message} />
          )}

          <form onSubmit={handleChangePassword}>
            <TextField label="Current Password">
              <TextField.Input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </TextField>

            <TextField label="New Password">
              <TextField.Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </TextField>

            <TextField label="Confirm New Password">
              <TextField.Input
                type="password"
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </TextField>

            <Button variant="brand-primary" type="submit">
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
