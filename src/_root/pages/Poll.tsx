import { useState, useEffect } from "react";
import { Models } from "appwrite";
import { useParams, Link } from "react-router-dom"

import { useGetPollById } from "@/lib/react-query/queries"
import { CandidateCard, Loader } from "@/components/shared"
import { Button } from "@/components/ui"

const Course = () => {
  const { id } = useParams();
  const { data: poll } = useGetPollById(id || "");
  const [voted, setVoted] = useState(false);
  
  useEffect(() => {
    // Retrieve votes from local storage when component mounts
    const voteState = localStorage.getItem("voted");
    if (voteState !== null) {
      setVoted(true);
    }
  }, []);
  
  if (!poll) {
    return (
      <div className="flex-center flex-col h-full w-full">
        <Loader />
      </div>
    );
  }

  if (voted) {
    return (
      <div className="flex-center flex-col h-[70vh] w-full">
        <h2 className="h2-bold">you have already voted, go to results</h2>
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
      <div className="home-container">
        
        <h2 className="h2-bold">{poll.title}</h2>
        <div className="w-full min-h-[15rem] rounded-lg overflow-hidden border border-dark-4">
          <img 
            src="/assets/images/hero.jpeg"
            className="w-full h-full"
            alt="Hero"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {poll.candidates?.map((candidate: Models.Document, index: string) => (
            <CandidateCard 
              candidate={candidate} key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Course;
