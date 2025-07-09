function CallButton({ handleVideoCall }) {
  return (
    <div className="p-4 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-end max-w-7xl mx-auto w-full fixed top-0 z-50">
      <button
        onClick={handleVideoCall}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg transition duration-200 shadow-md"
      >
        📹 Video Call
      </button>
    </div>
  );
}

export default CallButton;
