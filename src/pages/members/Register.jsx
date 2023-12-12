import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerMember } from '../../modules/fetch/members/users';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerMember({ email, password });
      // Redirect to login page after successful registration
      navigate('/users/login',{ state: { successMessage: 'Registration successful. Please login.' } });
      setSuccessMessage('Registration successful. Please login.');
      console.log('Registration successful. Please login.');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF9EC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="****"
            />
          </div>
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#677C52] hover:bg-[#8FA778] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;