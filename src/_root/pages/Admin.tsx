import { useGetCandidates } from "@/lib/react-query/queries";
import { CandidateCard, Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { data: candidates, isLoading } = useGetCandidates(10);

  if (isLoading) {
    return (
      <div className="w-full h-[100dvh] flex-col flex-center">
        <Loader />
      </div>
    );
  }

  
  return (
    <div className="flex flex-1">
      <div className="p-4">
        <div className="mb-4 w-full flex items-center justify-between">
          <div className="flex-start gap-3 justify-start w-full max-w-5xl">
            <img
              src="/assets/icons/checklist.svg"
              width={26}
              height={26}
              alt="edit"
            />
            <h2 className="text-[22px] font-bold text-left w-left">
              Candidates 
            </h2>
          </div>

          <Button className="shad-button_primary">
            Add
          </Button>
        </div>

        {candidates.documents.map((candidate) => (
          <div className="my-4 rounded-lg shadow-md p-2 border w-full flex justify-between">
            <h2>{candidate.name}</h2>

            <Button>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;