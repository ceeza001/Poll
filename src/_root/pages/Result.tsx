import { Link } from "react-router-dom";

import { useGetCandidates } from "@/lib/react-query/queries";

import { Loader } from "@/components/shared";

const Result = () => {
  const {
    data: candidates,
    isLoading: isCandidateLoading,
  } = useGetCandidates(10);
  
  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full items-center max-w-5xl">
        <img
          src="/assets/icons/result.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Results</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {isCandidateLoading && !candidates ? (
            <Loader />
          ) : (
            <ul className="w-full grid 2xl:grid-cols-2 gap-6">
              {candidates?.documents.map((candidate) => (
                <li key={candidate?.$id}>
                  <div className="user-card">
                    <img
                      src="/assets/images/profile.jpg"
                      alt="profile"
                      className="rounded-full w-[8rem]"
                    />
                    <span className="text-center">
                      <p>{candidate.name}</p>
                      <p>{candidate.department}</p>
                      <span className="justify-center flex gap-2 items-center">
                        <p>{candidate.voters.length || 0}</p> 
                        vote{candidate.voters.length !== 1 && "s"}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>

      <div className="mt-8 flex flex-col md:flex-row w-full gap-4">
            <Link 
              to="/vote" 
              className="flex items-center gap-6 body-bold bg-primary-500 w-full p-[0.8rem] rounded-lg">
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
  )
}

export default Result;