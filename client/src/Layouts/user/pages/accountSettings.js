"use client";

import React from "react";

// Dummy components for button, text field, and alert
const Button = ({ variant, icon, onClick, children }) => (
  <button className={`btn-${variant} px-4 py-2 rounded text-white font-medium shadow`} onClick={onClick}>
    {icon && <i className={`icon-${icon} mr-2`}></i>}
    {children}
  </button>
);

const TextField = ({ label, helpText, children }) => (
  <div className="flex flex-col w-full gap-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
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
    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

const Alert = ({ variant, title, description, actions }) => (
  <div className={`alert-${variant} border-l-4 p-4 rounded bg-red-50 text-red-700`}>
    <strong className="block font-semibold">{title}</strong>
    <p className="text-sm">{description}</p>
    {actions}
  </div>
);

// Main Component
function AccountSettings() {
  return (
    <div className="flex h-full w-full items-center flex-col gap-8 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="w-full max-w-lg flex flex-col items-center gap-10 bg-white p-8 rounded-lg shadow-sm">
        
        {/* Account Header */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>
          <p className="text-sm text-gray-500">Update your profile and personal details here</p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center gap-6 w-full">
          <h2 className="text-lg font-medium text-gray-800">Profile</h2>
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
              alt="Avatar"
            />
            <Button variant="neutral-secondary" icon="FeatherUpload" onClick={() => {}}>
              Upload
            </Button>
          </div>

          {/* Personal Details */}
          <div className="flex w-full flex-col gap-4">
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
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-lg font-medium text-gray-800">Password</h2>
          <TextField label="Current Password">
            <TextField.Input type="password" placeholder="Enter current password" onChange={() => {}} />
          </TextField>
          <TextField label="New Password" helpText="At least 8 characters, including one uppercase letter and one number.">
            <TextField.Input type="password" placeholder="Enter new password" onChange={() => {}} />
          </TextField>
          <TextField>
            <TextField.Input type="password" placeholder="Re-type new password" onChange={() => {}} />
          </TextField>
          <Button variant="brand-primary" onClick={() => {}}>
            Change Password
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="w-full flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
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
