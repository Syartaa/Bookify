import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData); // Log to check formData
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setError("");  // Clear previous errors
    setLoading(true);  // Start the loading state
  
    try {
      const response = await fetch("http://localhost:3001/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful login, e.g., redirect or show a success message
        console.log("Login successful", data);
        console.log(data);
        // Store token and user data in cookies
        Cookies.set('token', data.token, { sameSite: 'None', secure: true });
        Cookies.set('user', JSON.stringify(data.user), { sameSite: 'None', secure: true });
        
  
        // Navigate based on the user role
        if (data.user.role === "admin") {
          navigate("/");  // Redirect to the admin dashboard
        } else if (data.user.role === "user") {
          navigate("/home");  // Redirect to the user home page
        }
      } else {
        setError(data.error || "Login failed");
        setError(data.error || "Login failed, please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Internal server error");
      setError("Internal server error, please try again later.");
    } finally {
      setLoading(false);
      setLoading(false);  
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
         
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <a href="/signup" className="border-b border-gray-500 border-dotted">
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          />
        </div>
      </div>
    </div>
  );
}