import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api.js';

function SignUpPage() {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate(signupData);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row w-full max-w-5xl">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-2 font-mono">Connectify</h1>
          <p className="text-sm text-gray-500 mb-6">
            Join Streamify and start your language learning adventure!
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 rounded-lg p-3 mb-4">
              {error.message || 'Signup failed. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-600 text-gray-600"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="mt-1 w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-600 text-gray-600"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                className="mt-1 w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-600 text-gray-600"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters.
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <p className='text-black'>
                I agree to the{' '}
                <span className="text-blue-600 hover:underline">terms of service</span> and{' '}
                <span className="text-blue-600 hover:underline">privacy policy</span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition ${
                isPending
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isPending ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-black">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Section (Image + Text) */}
        <div className="hidden lg:flex w-1/2 bg-blue-950 text-white items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <img
              src="/Chatting-rafiki.png"
              alt="Illustration"
              className="w-64 h-64 object-contain mx-auto"
            />
            <h2 className="text-2xl font-semibold">
              Connect with language partners worldwide
            </h2>
            <p className="text-sm text-blue-200">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
