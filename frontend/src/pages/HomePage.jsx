import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import Layout from "../components/Layout";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs?.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <Layout showSidebar={true}>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section: Your Friends */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-900">
                Your Friends
              </h2>
              <Link
                to="/notification"
                className="rounded-full w-10 h-10 shadow-sm shadow-black flex justify-center items-center"
              >
                FR
              </Link>
            </div>

            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-blue-600" />
              </div>
            ) : friends.length === 0 ? (
              <NoFriendsFound />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
            )}
          </div>

          {/* Section: Recommended Users */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-900 mb-1">
                Meet New Learners
              </h2>
              <p className="text-sm text-gray-600">
                Discover perfect language exchange partners based on your
                profile
              </p>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-blue-600" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center rounded-xl">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  No recommendations available
                </h3>
                <p className="text-gray-500">
                  Check back later for new language partners!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                  return (
                    <div
                      key={user._id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-blue-300">
                          <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <p className="text-xs text-gray-500 mt-1">
                              {user.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Language Badges */}
                      <div className="flex flex-wrap gap-2 mb-2 text-sm">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                          {getLanguageFlag(user.nativeLanguage)}{" "}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className="border px-2 py-0.5 rounded-full text-xs">
                          {getLanguageFlag(user.learningLanguage)} Learning:{" "}
                          {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                          {user.bio}
                        </p>
                      )}

                      {/* Send Friend Request Button */}
                      <button
                        className={`w-full rounded-md py-2 font-medium ${
                          hasRequestBeenSent || isPending
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? "Request Sent" : "Send Friend Request"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
