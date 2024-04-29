import { useState, useEffect } from "react";
import { Models } from "appwrite";

import {
  useVote,
} from "@/lib/react-query/queries";

import { Button } from "@/components/ui";


type UserCardProps = {
  candidate: Models.Document;
};

const UserCard = ({ candidate }: UserCardProps) => {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(candidate?.votes);
  const { mutate: vote } = useVote();

  const currentVotes = candidate?.votes || [];

  useEffect(() => {
    // Retrieve votes from local storage when component mounts
    const voteState = localStorage.getItem("voted");
    if (voteState !== null) {
      setVoted(true);
    }
  }, []);
  
  const handleVote = async () => {
    if (!voted) {
      const updatedVotes = [...currentVotes, '1']; // '1' is the voter's ID, replace it with the actual voter ID
    
      // Update the votes state with the updated votes array
      setVotes(updatedVotes);

      // Perform the vote mutation
      vote({ votes: updatedVotes, candidateId: candidate.$id });

      // Set voted status to true
      setVoted(true);

      // Set voted status to true in local storage
      localStorage.setItem('voted', candidate.$id);
    }
  };


  return (
    <div className="user-card">
      <img
        src={`/assets/candidates/${candidate?.imageUrl}.jpg`}
        alt="candidate"
        className="rounded-lg w-full aspect-square"
      />

      <div className="text-text-color w-full flex flex-col items-start gap-1">
        <h3 className="h3-bold">
           {candidate?.name}
        </h3>

        <p className="base-semibold">
        Total votes: {votes?.length || 0}
        </p>
        
        <p className="mt-4 text-gray-500 subtle-semibold">
          In our academic community, every voice matters, and we commit to fostering engagement through inclusive voting.
        </p>
        
      </div>

      <Button 
        onClick={handleVote}
        className="w-full shad-button_primary px-5"
        disabled={voted}
      >
        {voted ? 'Already Voted' : 'Vote'}
      </Button>
      
    </div>
  );
};

export default UserCard;