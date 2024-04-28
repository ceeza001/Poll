import { Link } from "react-router-dom";

import { useGetCandidates } from "@/lib/react-query/queries";

import { Loader, UserCard } from "@/components/shared";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const Vote = () => {
  const {
    data: candidates,
    isLoading: isCandidateLoading,
    isError: isErrorCandidates,
  } = useGetCandidates(10);

  
  if (isErrorCandidates) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        
      </div>
    );
  }

  return (
    <div className="explore-container">
      
      <div className="flex-between w-full max-w-5xl mb-7">
        <h3 className="body-bold md:h3-bold">Candidates</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/vote.svg"
            width={20}
            height={20}
            alt="vote"
            className="invert-white"
          />
        </div>
      </div>

      {currentUser.candidates && currentUser.candidates.length !== 0 ? ( 
        <div className="p-[1rem] bg-dark-2 border-dark-4 border rounded-lg">
          <div className="my-2 mb-6 flex gap-4 items-center">
            <img
              src="/assets/icons"
              alt="profile"
              className="rounded-full w-[5rem]"
            />
            <span>
              <p>{currentUser.candidates.name}</p>
              <p>{currentUser.candidates.department}</p>
            </span>
          </div>
          <h2>You voted {currentUser.candidates?.name} for the position of faculty rep </h2>
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {isCandidateLoading && !candidates ? (
            <Loader />
          ) : (
            <ul className="w-full grid 2xl:grid-cols-2 gap-6">
              {candidates?.documents.map((candidate) => (
                <li key={candidate?.$id}>
                  <UserCard candidate={candidate} voter={currentUser} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8 flex w-full gap-4">
            <Link 
              to="/vote" 
              className="flex items-center gap-6 body-bold bg-dark-2 border border-dark-4 w-full p-[0.8rem] rounded-lg">
              <img 
                src="/assets/icons/vote.svg"
                alt="vote" 
                className="w-[2rem] h-[2rem] invert-white"
              />
              <p>Vote</p>
            </Link>
            <Link 
              to="/result" 
              className="flex items-center gap-6 body-bold bg-dark-2 border border-dark-4 w-full p-[0.8rem] rounded-lg">
              <img 
                src="/assets/icons/result.svg"
                alt="result" 
                className="w-[2rem] h-[2rem] invert-white"
              />
              <p>Results</p>
            </Link>
          </div>

    </div>
  );
};

export default Vote;