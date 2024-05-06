import { useState, useEffect } from "react";
import { Models } from "appwrite";
import { useParams, Link } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext";

import { useGetPollById } from "@/lib/react-query/queries"
import { CandidateCard, Loader } from "@/components/shared"
import { Button } from "@/components/ui"

const Course = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: poll } = useGetPollById(id || "");
  const [voted, setVoted] = useState(false);
  
  useEffect(() => {
    // Retrieve votes from local storage when component mounts
    const voteState = poll?.votes?.find((vote: string) => vote === user.id);
    if (voteState !== undefined) {
      setVoted(true);
    }
  }, [poll, user.id]);

  const handleVote = () => {
    setVoted(true);
  };

  if (!poll) {
    return (
      <div className="flex-center flex-col h-full w-full">
        <Loader />
      </div>
    );
  }

  if (voted) {
    return (
      <div className="flex-center text-center flex-col h-[70vh] w-full p-4">
        <h2 className="h2-bold">Congratulations you have successfully voted</h2>
        <p>go to results</p>
        <Link to={`/results/${poll.$id}`}>
          <Button className="mt-4 shad-button_primary">
            Results
          </Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="flex flex-1">
      <div className="p-4">

        <div className="mb-2 rounded-lg p-2 flex justify-between items-center">
          <h2 className="h2-bold">{poll.title}</h2>
          <Link to={`/results/${poll.$id}`}>
            <Button className="shad-button_primary">
              Results
            </Button>
          </Link>
        </div>
        
        <div className="w-full h-[15rem] rounded-lg overflow-hidden border border-dark-4">
          <img 
            src="/assets/images/hero.jpeg"
            className="w-full h-full"
            alt="Hero"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {poll.candidates?.map((candidate: Models.Document, index: string) => (
            <CandidateCard 
              candidate={candidate} key={index} poll={poll} onVote={handleVote}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Course;
