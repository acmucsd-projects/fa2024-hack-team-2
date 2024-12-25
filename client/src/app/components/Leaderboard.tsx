import React from "react";
import clsx from "clsx";

type LeaderboardEntry = {
  id: number;
  name: string;
  likes: number;
};

type LeaderboardProps = {
  users: LeaderboardEntry[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  return (
    <div className="bg-white max-w-lg mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h1>
      <ul>
        {users.map((user, index) => (
          <li
            key={user.id}
            className={clsx(
              "flex items-center justify-between p-4 rounded-lg mb-2",
              {
                "bg-blue-500 text-white": index === 0, // First place
                "bg-gray-200": index === 1,           // Second place
                "bg-gray-300": index === 2,           // Third place
                "bg-gray-100": index > 2,             // All others
              }
            )}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div
                className={clsx(
                  "h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold",
                  {
                    "bg-blue-600 text-white": index === 0,
                    "bg-gray-300 text-gray-800": index > 0,
                  }
                )}
              >
                {index === 0 ? "🏆" : index === 1 ? "2nd" : index === 2 ? "3rd" : index + 1}
              </div>

              {/* User Information */}
              <div>
                <p className="font-medium truncate">{user.name}</p>
              </div>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700">{user.likes}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-red-500"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const dummyData: LeaderboardEntry[] = [
  { id: 1, name: "Author1", likes: 150 },
  { id: 2, name: "Author2", likes: 120 },
  { id: 3, name: "Author3", likes: 100 },
  { id: 4, name: "Author4", likes: 75 },
];

export default Leaderboard;
