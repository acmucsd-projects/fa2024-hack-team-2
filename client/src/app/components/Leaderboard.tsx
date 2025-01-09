import React, { use, useEffect, useState } from "react";
import clsx from "clsx";
import backendConnection from "@/communication";

// Type definitions
type User = {
  user_id: string;
  username: string;
  totalLikes: number;
  picture: string;
};

export const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await backendConnection.get("/leaderboard");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch leaderboard data", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const crownIcon =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/e57ce0fb4d7e6f9d8ae6cf2dda741add41521ccec68798186f13f301773163b5?placeholderIfAbsent=true";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-4xl">
        {/* Top 3 Section */}
        <div className="relative mb-12 flex items-end justify-center gap-16">
          {/* Crown */}
          <img
            src={crownIcon}
            alt="Crown"
            className="absolute -top-16 left-1/2 w-16 -translate-x-1/2 transform"
          />

          {/* Second Place */}
            {users[1] && (
            <div
              className="flex w-1/3 flex-col items-center cursor-pointer"
              onClick={() => window.location.href = `/profile?username=${users[1].username}`}
            >
              <h2 className="mb-4 text-2xl font-extrabold text-gray-800">
              2nd
              </h2>
              <div
              className={clsx(
                "flex h-28 w-28 items-center justify-center rounded-full bg-blue-400 shadow-md",
                "transition-transform transform hover:scale-105"
              )}
              >
              <img
                src={users[1].picture}
                alt="Second place"
                className="h-24 w-24 rounded-full"
              />
              </div>
              <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-gray-700">
                {users[1].totalLikes}
              </span>
              <HeartIcon size="lg" />
              </div>
            </div>
            )}

            {/* First Place */}
            {users[0] && (
            <div
              className="flex w-1/3 flex-col items-center cursor-pointer"
              onClick={() => window.location.href = `/profile?username=${users[0].username}`}
            >
              <div className="relative">
              <div
                className={clsx(
                "flex h-36 w-36 items-center justify-center rounded-full bg-blue-500 shadow-lg",
                "transition-transform transform hover:scale-105"
                )}
              >
                <img
                src={users[0].picture}
                alt="First place"
                className="h-32 w-32 rounded-full"
                />
              </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-gray-700">
                {users[0].totalLikes}
              </span>
              <HeartIcon size="lg" />
              </div>
            </div>
            )}

            {/* Third Place */}
            {users[2] && (
            <div
              className="flex w-1/3 flex-col items-center cursor-pointer"
              onClick={() => window.location.href = `/profile?username=${users[2].username}`}
            >
              <h2 className="mb-4 text-2xl font-extrabold text-gray-800">
              3rd
              </h2>
              <div
              className={clsx(
                "flex h-28 w-28 items-center justify-center rounded-full bg-blue-400 shadow-md",
                "transition-transform transform hover:scale-105"
              )}
              >
              <img
                src={users[2].picture}
                alt="Third place"
                className="h-24 w-24 rounded-full"
              />
              </div>
              <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-gray-700">
                {users[2].totalLikes}
              </span>
              <HeartIcon size="lg" />
              </div>
            </div>
            )}
        </div>

        {/* Full Leaderboard */}
        <ul className="space-y-4">
          {users.slice(3).map((user, index) => (
            <li
              key={user.user_id}
              className={clsx(
                "flex items-center justify-between rounded-full border bg-white p-4 shadow-md",
                "border-black hover:bg-gray-100",
              )}
              onClick={() => window.location.href = `/profile?username=${user.username}`}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black">
                  <img
                    src={user.picture}
                    alt={`${user.username}'s avatar`}
                    className="h-full w-full rounded-full"
                  />
                </div>
                <p className="font-medium text-gray-800">{`${index + 4}. ${user.username}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">
                  {user.totalLikes}
                </span>
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
