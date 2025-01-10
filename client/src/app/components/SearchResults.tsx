import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import backendConnection from "../../communication";
import Dropdown from "./Dropdown";
import Filter from "./Filter";

interface PostProps {
  _id: string;
  title: string;
  product_details?: string;
  material?: string;
  brand?: string;
  cost?: number;
  likes: number;
  author: string;
  images: string[];
  tags: string[];
  date_created: string;
}

interface MyComponentProps {
  searchQuery: string;
}

const SearchResults: React.FC<MyComponentProps> = ({ searchQuery }) => {
  const [sortingOption, setSortingOption] = useState<string>("Alphabetical");
  const [searchResults, setSearchResults] = useState<PostProps[] | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUserSearch, setIsUserSearch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const search = async (query: string) => {
      const rel = {
        Alphabetical: "",
        "Most Popular": "likes",
        Recent: "recent",
        Oldest: "oldest",
        "Price (High to Low)": "priceHigh",
        "Price (Low to High)": "priceLow",
      };

      try {
        if (query.startsWith("@")) {
          setIsUserSearch(true);
          const response = await backendConnection.get("/search/users", {
            params: { query },
          });
          setSearchResults(response.data);
        } else {
          setIsUserSearch(false);
          const response = await backendConnection.get("/search/posts", {
            params: {
              query,
              relevance: rel[sortingOption as keyof typeof rel],
              tags: filterTags.join(","),
            },
          });
          setSearchResults(response.data);
          console.log(response.data);
        }
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    setError(null);
    search(searchQuery);
  }, [searchQuery, filterTags, sortingOption]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

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

  return (
    <div className="w-full px-4 py-6">
      <p className="mb-4 text-center text-2xl font-bold">
        Search Results for &quot;{searchQuery}&quot;
      </p>
      {!isUserSearch && (
        <div className="mb-4 flex w-96 gap-6 rounded bg-gray-200 p-4">
          <span>
            <label>Sort By:</label>
            <Dropdown
              options={[
                "Alphabetical",
                "Most Popular",
                "Recent",
                "Oldest",
                "Price (High to Low)",
                "Price (Low to High)",
              ]}
              selected={sortingOption}
              onDropdownChange={(val: string) => setSortingOption(val)}
            />
          </span>
          <span>
            <label>Filter By:</label>
            <Filter
              tags={filterTags}
              onTagFilterChange={(tags) => setFilterTags([...tags])}
            />
          </span>
        </div>
      )}
      <Posts posts={searchResults} isUser={isUserSearch} />
    </div>
  );
};

export default SearchResults;
