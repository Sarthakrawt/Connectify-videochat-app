import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constant/index";

const FriendCard = ({ friend }) => {
  console.log(friend)
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-200 rounded-xl border border-base-300">
      <div className="card-body p-5 space-y-3">
        {/* USER INFO */}
        <div className="flex items-center gap-4">
          <div className="avatar size-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <div>
            <h3 className="font-semibold truncate text-lg">{friend.fullName}</h3>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary badge-sm text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline badge-sm text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* MESSAGE BUTTON */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-sm btn-outline btn-primary w-full mt-2"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

// Get Flag Function
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
