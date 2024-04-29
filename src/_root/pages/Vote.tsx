import { useParams, Link } from "react-router-dom";
import { useGetCandidates } from "@/lib/react-query/queries";

import { UserCard } from "@/components/shared"

const Vote = () => {
  const { id } = useParams();
  const { data: candidates } = useGetCandidates(10);

  if (!candidates) {
    return <div>Loading...</div>;
  }

  console.log(candidates);
  
  // Find the candidate with name equal to the id parameter
  const selectedCandidate = candidates.documents.find(candidate => candidate.id === id);
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <UserCard candidate={selectedCandidate} />
        </div>
      </div>
      
    </div>
  );
};

export default Vote;