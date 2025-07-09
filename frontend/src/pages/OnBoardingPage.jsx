import React, { useState } from 'react';
import UseAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import toast from 'react-hot-toast';
import { LANGUAGES } from '../constant';

function OnBoardingPage() {
  const { authUser } = UseAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://i.pravatar.cc/150?img=${idx}`;
    setFormState({ ...formState, profilePic: randomAvatar });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Pic Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-lg">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleRandomAvatar}
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Generate Random Avatar
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your full name"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tell others about yourself and your language learning goals"
            />
          </div>

          {/* Language Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Native Language */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Native Language</label>
              <select
                name="nativeLanguage"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, nativeLanguage: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Learning Language */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Learning Language</label>
              <select
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, learningLanguage: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select language you're learning</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learn-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={(e) =>
                setFormState({ ...formState, location: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="City, Country"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 font-semibold text-white rounded-lg transition ${
              isPending
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPending ? 'Onboarding...' : 'Complete Onboarding'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnBoardingPage;
