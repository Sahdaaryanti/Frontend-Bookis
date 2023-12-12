import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../modules/fetch/members/users";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const data = jwtDecode(token);
        const levelUser = data.isUser ? "admin" : "member";
        if (levelUser === "admin") {
          navigate("/admins/dashboard");
        } else if (levelUser === "member") {
          navigate("/users/dashboard");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }

    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [navigate, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log("Data from server:", data);

      // Assuming the user role is available in the data received
      const levelUser = data.levelUser;
  
      localStorage.setItem("token", data.token);
  
      const decodedToken = jwtDecode(data.token);
      if (decodedToken && decodedToken.userId) {
        const userId = decodedToken.userId;
  
        localStorage.setItem('userId', userId);
  
        // Redirect based on user role
        if (levelUser === "admin") {
          navigate("admins/dashboard");
        } else if (levelUser === "member") {
          navigate("/users/dashboard");
        }
      } else {
        console.error('Error decoding user ID from token');
        setError('Error decoding user ID from token');
      }
    } catch (error) {
      console.error("Login Error:", error);
      console.log(error.response);
      setError("Invalid email or password. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF9EC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2">
        <div className="mb-4">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          {successMessage && <p className="text-green-500 m-4 text-sm">{successMessage}</p>}
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@mail"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#677C52] hover:bg-[#8FA778] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/users/registrasi"
              className="font-medium text-[#EA2020] hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;