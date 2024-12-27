import React from "react";
import clsx from "clsx";

// Type definitions
type LeaderboardEntry = {
  id: number;
  name: string;
  profilePicture: string;
  likes: number;
};

type LeaderboardProps = {
  users: LeaderboardEntry[];
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const crownIcon =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e57ce0fb4d7e6f9d8ae6cf2dda741add41521ccec68798186f13f301773163b5?placeholderIfAbsent=true";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-8">
        {/* Top 3 Section */}
        <div className="flex items-end justify-center gap-16 mb-12 relative">
          {/* Crown */}
          <img
            src={crownIcon}
            alt="Crown"
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-16"
          />

          {/* Second Place */}
          {users[1] && (
            <div className="flex flex-col items-center w-1/3">
              <h2 className="text-2xl font-extrabold text-gray-800 mb-4">2nd</h2>
              <div
                className={clsx(
                  "w-28 h-28 rounded-full flex items-center justify-center bg-blue-400 shadow-md"
                )}
              >
                <img
                  src={users[1].profilePicture}
                  alt="Second place"
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-700 font-bold text-lg">{users[1].likes}</span>
                <HeartIcon size="lg" />
              </div>
            </div>
          )}

          {/* First Place */}
          {users[0] && (
            <div className="flex flex-col items-center w-1/3">
              <div className="relative">
                <div
                  className={clsx(
                    "w-36 h-36 rounded-full flex items-center justify-center bg-blue-500 shadow-lg"
                  )}
                >
                  <img
                    src={users[0].profilePicture}
                    alt="First place"
                    className="w-32 h-32 rounded-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-700 font-bold text-lg">{users[0].likes}</span>
                <HeartIcon size="lg" />
              </div>
            </div>
          )}

          {/* Third Place */}
          {users[2] && (
            <div className="flex flex-col items-center w-1/3">
              <h2 className="text-2xl font-extrabold text-gray-800 mb-4">3rd</h2>
              <div
                className={clsx(
                  "w-28 h-28 rounded-full flex items-center justify-center bg-blue-400 shadow-md"
                )}
              >
                <img
                  src={users[2].profilePicture}
                  alt="Third place"
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-700 font-bold text-lg">{users[2].likes}</span>
                <HeartIcon size="lg" />
              </div>
            </div>
          )}
        </div>

        {/* Full Leaderboard */}
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={user.id}
              className={clsx(
                "flex items-center justify-between p-4 border rounded-full shadow-md bg-white",
                "border-black"
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-black"
                >
                  <img
                    src={user.profilePicture}
                    alt={`${user.name}'s avatar`}
                    className="w-6 h-6"
                  />
                </div>
                <p className="font-medium text-gray-800">{`${index + 1}. ${user.name}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-semibold">{user.likes}</span>
                <HeartIcon />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const HeartIcon: React.FC<{ size?: "lg" }> = ({ size }) => {
  const className = size === "lg" ? "w-8 h-8" : "w-6 h-6";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};

export default Leaderboard;
