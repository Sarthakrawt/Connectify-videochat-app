import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-blue-800">Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
          </div>
        ) : (
          <>
            {/* Incoming Friend Requests */}
            {incomingRequests.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  Friend Requests
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-4">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={request.sender.profilePic}
                            alt={request.sender.fullName}
                            className="w-14 h-14 rounded-full object-cover border border-blue-300"
                          />
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">
                              {request.sender.fullName}
                            </h3>
                            <div className="text-sm text-gray-600 flex gap-2 mt-1">
                              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="border border-gray-300 px-2 py-0.5 rounded-full text-xs">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className={`px-4 py-1.5 rounded-md text-sm font-semibold text-white ${
                            isPending
                              ? 'bg-blue-300 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          {isPending ? "Accepting..." : "Accept"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests */}
            {acceptedRequests.length > 0 && (
              <section className="pt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  New Connections
                </h2>

                <div className="space-y-4">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="bg-white shadow-md rounded-xl p-4 flex items-start gap-4"
                    >
                      <img
                        src={notification.recipient.profilePic}
                        alt={notification.recipient.fullName}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {notification.recipient.fullName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          accepted your friend request
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Recently</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mt-1">
                        New Friend
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
