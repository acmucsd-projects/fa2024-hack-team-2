import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import backendConnection from "../../communication";

interface MyComponentProps {
  searchQuery: string;
}

const SearchResults: React.FC<MyComponentProps> = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUserSearch, setIsUserSearch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // function to send search query to the backend
  const search = async (query: string) => {

    // user search
    if (query.startsWith("@")) {
        setIsUserSearch(true);
        backendConnection.get("/search/users", 
          { params: { query: query } 
        }).then((response) => {
            // success
            setSearchResults(response.data);
        }).catch((error) => {
            throw new Error(`Failed to get data: ${error}`);
        });
    }
    // posts search
    else {
        backendConnection.get("/search/posts", 
            { params: { query: query } 
        }).then((response) => {
            // success
            setSearchResults(response.data);
          }).catch((error) => {
            throw new Error(`Failed to get data: ${error}`);
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
  
    // perform the search when `searchQuery` changes
    setIsLoading(true);
    setError(null);
    search(searchQuery)
    
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
      <Posts posts={searchResults} isUser={isUserSearch} />
    </div>
  );
};

export default SearchResults;