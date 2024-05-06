import { Models } from "appwrite";
import { useParams, Link } from "react-router-dom"

import { useGetPollById } from "@/lib/react-query/queries"
import { Loader } from "@/components/shared"
import { Button } from "@/components/ui"

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
      <div className="p-4">

        <div className="rounded-lg p-2 flex justify-between items-center">
          <h2 className="h2-bold">{poll.title} results</h2>
          <Link to={`/polls/${id}`}>
            <Button className="shad-button_primary">
              Vote
            </Button>
          </Link>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {poll.candidates?.map((candidate: Models.Document, index: string) => (
            <div key={index} className="flex flex-col gap-2 w-full bg-card rounded-lg p-2">
              <div className="aspect-square overflow-hidden">
                <img
                  src={candidate.imageUrl}
                  className="w-full h-full"
                />
              </div>
              
              <div>
                <h2 className="text-[14px] font-semibold">{candidate.name}</h2>
                <p>{candidate.votes.length} vote{candidate.votes.length > 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/polls">
          <Button className="mt-4 shad-button_primary">
            Back
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Course;
