import { useState } from "react";
import { Models } from "appwrite";

import { useVote } from "@/lib/react-query/queries";
import { Button } from "@/components/ui";

type UserCardProps = {
  candidate: Models.Document | null;
};

const CandidateCard = ({ candidate }: UserCardProps) => {
  const [voteModal, setVoteModal] = useState(false);
  
  const handleVote = async () => {
    
  };

  return (
    <div className="bg-card w-full shadow-md border flex flex-col justify-between rounded-lg p-2">
      {candidate && (
        <>
          <div>
            <img
              src={candidate.imageUrl}
              alt="candidate"
              className="rounded-lg w-full aspect-video"
            />

            <div className="text-dark-2 w-full flex flex-col justify-between gap-1 mt-4">
              <h2 className="text-[12px] font-bold">{candidate.name}</h2>
            </div>
          </div>

          <p className="mt-2 text-gray-500 subtle-semibold">
            {candidate.slogan}
          </p>
          
          <Button
            onClick={() => setVoteModal(!voteModal)}
            className="w-full shad-button_primary px-5"
            
          >
            Vote
          </Button>

          {voteModal && (
            <div className="flex-col flex-center fixed top-0 left-0 right-0 px-4 z-[50] w-screen h-screen bg-[#000000]/70">
              <div className="bg-background p-2 rounded-lg border shadow-md h-fit w-full mx-auto">
                <h2 className="text-[14px] text-center font-bold">
                  Are you sure you want to vote for {candidate.name}?
                </h2>

                <div className="border border-border w-full p-2 rounded-lg">
                  <Button onClick={handleVote}>Vote</Button>
                </div>
              </div>
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateCard;