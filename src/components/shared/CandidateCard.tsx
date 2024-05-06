import { useState } from "react";
import { Models } from "appwrite";

import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui";
import { useVote } from "@/lib/react-query/queries";

type UserCardProps = {
  candidate: Models.Document | null;
  poll: Models.Document;
  onVote: () => void;
};

const CandidateCard = ({ candidate, poll, onVote }: UserCardProps) => {
  const { user } = useUserContext();
  const { toast } = useToast();
  const [voteModal, setVoteModal] = useState(false);

  const { mutate: vote } = useVote();
  
  const handleVote = async () => {
    let votesArray = candidate?.votes;
    let votersArray = poll?.votes;
    
    votesArray.push(user.voterId);
    votersArray.push(user.id);
    
    vote({ votes: votesArray, candidateId: candidate.$id, pollId: poll.$id, voters: votersArray });

    if (!vote) {
      toast({
        title: `vote failed. Please try again.`,
      });
    }
    onVote();
  };

  if (!candidate) return null;
  
  return (
    <div className="bg-card w-full shadow-md border flex flex-col justify-between rounded-lg p-2">
      {candidate && (
        <>
          <div>
            <img
              src={candidate?.imageUrl}
              alt="candidate"
              className="rounded-lg w-full aspect-video"
            />

            <div className="text-dark-2 w-full flex flex-col justify-between gap-1 mt-4">
              <h2 className="text-[12px] font-bold">{candidate?.name}</h2>
            </div>
          </div>

          <p className="mt-2 text-gray-500 subtle-semibold">
            {candidate?.slogan}
          </p>
          
          <Button
            onClick={() => setVoteModal(!voteModal)}
            className="w-full shad-button_primary px-5"
            
          >
            Vote
          </Button>

          {voteModal && (
            <div className="flex-col flex-center fixed top-0 left-0 right-0 px-4 z-[50] w-screen h-screen bg-[#000000]/70">
              <div className="bg-background p-2 rounded-lg border shadow-md h-fit w-full max-w-2xl mx-auto">
                <h2 className="text-[14px] text-center font-bold">
                  Are you sure you want to vote for {candidate.name}?
                </h2>

                <div className="my-2 flex flex-col md:flex-row justify-between gap-2">
                  <div className="flex gap-2 border border-border w-full p-2 rounded-lg">
                    <img
                      src={candidate?.imageUrl}
                      className="h-full w-[5rem] rounded-lg border border-border"
                    />

                    <div className="w-[100%]">
                      <h2 className="text-[14px] font-bold text-center">Voter's Information.</h2>
                      <div className="mt-2 flex w-full gap-2">Name: <p className="font-semibold">{user.name}</p></div>
                      <div className="flex gap-2">Voter ID: <p className="font-semibold">{user.voterId}</p></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 w-full p-2 rounded-lg">
                    <Button 
                      onClick={() => setVoteModal(!voteModal)}
                      className="shad-button_dark"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleVote}
                      className="shad-button_primary"
                    >
                      Vote
                    </Button>
                  </div>
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