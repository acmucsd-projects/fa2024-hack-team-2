import React, { useEffect, useState } from "react";
import Posts from "./Posts";

interface MyComponentProps {
  searchQuery: string;
}

const SearchResults: React.FC<MyComponentProps> = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: function to send search query to the backend
  const search = async (query: string) => {
    // if it starts with @: GET users
    // else: GET posts

    return {
      posts: [
        {
          // Post 1
          id: "emlkYW5l",
          title: "Cool Dress",
          bio: "testing this",
          product_details: "This is a really cool dress, perfect for summer!",
          material: "Silk",
          brand: "CoolDresses.org",
          cost: 1000,
          likes: 999,
          image: [
            "https://i.ebayimg.com/images/g/aFwAAOSwE1dkNSfR/s-l1200.jpg",
          ],
          liked: true,  // NOTE: not in post schema
          tags: ["Blue", "Bluer", "Bluey!", "BlueBlue", "BlueBlueBlue", "Berry Blue"],
          date_created: "2024-01-01"
        },
        {
          // Post 2
          id: "b3JpZ2FtaQ",
          title: "Very Very Very Very Very Very Very Cool Dress",
          product_details: "Yes!",
          image: [
            "https://i.ebayimg.com/images/g/aFwAAOSwE1dkNSfR/s-l1200.jpg",
          ],
          material: "Silk",
          brand: "CoolDresses.org",
          cost: 1000,
          likes: 999,
          liked: true, 
          tags: ["Blue", "Dress"],
          date_created: "2024-01-01"
        },
        {
          // Post 3
          id: "YmlyZHM",
          title: "Running Shoes",
          product_details: "This is a really cool dress, perfect for summer!",
          image: [
            "https://i.ebayimg.com/images/g/aFwAAOSwE1dkNSfR/s-l1200.jpg",
          ],
          material: "Silk",
          brand: "CoolDresses.org",
          cost: 1000,
          likes: 999,
          liked: true, 
          tags: ["Blue", "Dress"],
          date_created: "2024-01-01"
        },
        {
          // Post 4
          id: "YmVlcw",
          title: "Leather Backpack",
          product_details: "",
          image: [
            "https://i.ebayimg.com/images/g/aFwAAOSwE1dkNSfR/s-l1200.jpg",
          ],
          material: "Silk",
          brand: "CoolDresses.org",
          cost: 1000,
          likes: 999,
          liked: false,
          tags: ["Blue", "Dress"],
          date_created: "2024-01-01"
        },
        {
          // Post 5
          id: "d2h5d2h5",
          title: "Elegant Watch",
          product_details: "",
          image: [
            "https://i.ebayimg.com/images/g/aFwAAOSwE1dkNSfR/s-l1200.jpg",
          ],
          material: "Silk",
          brand: "CoolDresses.org",
          cost: 1000,
          likes: 999,
          liked: false, 
          tags: ["Blue", "Dress"],
          date_created: "2024-01-01"        },
      ],
    };
  };

  useEffect(() => {
    // perform the search when the component mounts or `searchQuery` changes
    setIsLoading(true);
    setError(null);
    search(searchQuery)
      .then((results) => {
        setSearchResults(results["posts"]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch search results.");
        setIsLoading(false);
      });
  }, [searchQuery]);

  // loading screen
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  // error screen
  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <p className="text-center text-3xl font-bold md:text-5xl">{error}</p>
        <p className="mb-32 text-xl text-gray-600">
          Try refining your search, or browse below.
        </p>
      </div>
    );
  }

  // no search results found
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <p className="text-center text-3xl font-bold md:text-5xl">
          Sorry, we couldn’t find anything.
        </p>
        <p className="mb-32 text-xl text-gray-600">
          Try refining your search, or browse below.
        </p>
      </div>
    );
  }

  // search results found
  return (
    <div className="w-full px-4 py-6">
      <p className="mb-6 text-center text-2xl font-bold">
        Search Results for &quot;{searchQuery}&quot;
        {/* NOTE: &quot; is a quotation mark */}
      </p>
      {/* TODO: edit line below to add user logic */}
      <Posts posts={searchResults} isUser={false} />
    </div>
  );
};

export default SearchResults;