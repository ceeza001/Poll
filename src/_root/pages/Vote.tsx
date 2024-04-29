import { useParams } from "react-router-dom";
import { useGetCandidates } from "@/lib/react-query/queries";
import { UserCard, Loader } from "@/components/shared";

const Vote = () => {
  const { id } = useParams();
  const { data: candidates, isLoading } = useGetCandidates(10);

  if (isLoading) {
    return (
      <div className="w-full h-[100dvh] flex-col flex-center">
        <Loader />
      </div>
    );
  }

  // Find the candidate with name equal to the id parameter
  const selectedCandidate = candidates?.documents.find(candidate => candidate.id === id);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          {selectedCandidate && <UserCard candidate={selectedCandidate} />}
        </div>
      </div>
    </div>
  );
};

export default Vote;