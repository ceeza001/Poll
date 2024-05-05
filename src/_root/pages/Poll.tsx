import { useParams } from "react-router-dom"

import { useGetPollById } from "@/lib/react-query/queries"
import { CandidateCard, Loader } from "@/components/shared"

const Course = () => {
  const { id } = useParams();
  const { data: poll } = useGetPollById(id || "");
  
  if (!poll) {
    return (
      <div className="flex-center flex-col h-full w-full">
        <Loader />
      </div>
    );
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
          {poll.candidates?.map((candidate, index) => (
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
