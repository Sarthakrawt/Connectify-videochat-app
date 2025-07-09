 function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center transition-all duration-300">
      {/* Icon Container */}
      <div className="size-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </div>

      {/* Heading */}
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        No notifications yet
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
        When you receive friend requests or messages, they'll show up here. Stay connected with your language partners!
      </p>
    </div>
  );
}

export default NoNotificationsFound;