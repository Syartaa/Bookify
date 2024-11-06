"use client";

import React from "react";

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
              src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
              alt="Avatar"
            />
            <Button variant="neutral-secondary" icon="FeatherUpload" onClick={() => {}}>
              Upload
            </Button>
          </div>

          {/* Personal Details */}
          <div className="flex flex-col space-y-4 w-full">
            <TextField label="First Name">
              <TextField.Input placeholder="Josef" onChange={() => {}} />
            </TextField>
            <TextField label="Last Name">
              <TextField.Input placeholder="Albers" onChange={() => {}} />
            </TextField>
            <TextField label="Email">
              <TextField.Input placeholder="josef@subframe.com" onChange={() => {}} />
            </TextField>
          </div>
        </div>

        {/* Password Section */}
        <div className="w-full space-y-6">
          <h2 className="text-xl font-medium text-gray-800">Password</h2>
          <TextField label="Current Password">
            <TextField.Input type="password" placeholder="Enter current password" onChange={() => {}} />
          </TextField>
          <TextField label="New Password" helpText="At least 8 characters, including one uppercase letter and one number.">
            <TextField.Input type="password" placeholder="Enter new password" onChange={() => {}} />
          </TextField>
          <TextField label="Confirm New Password">
            <TextField.Input type="password" placeholder="Re-type new password" onChange={() => {}} />
          </TextField>
          <Button variant="brand-primary" onClick={() => {}}>
            Change Password
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="w-full space-y-4 mt-8">
          <h2 className="text-xl font-medium text-red-600">Danger Zone</h2>
          <Alert
            variant="error"
            title="Delete Account"
            description="Permanently remove your account. This action cannot be undone."
            actions={
              <Button variant="destructive-secondary" onClick={() => {}}>
                Delete Account
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
