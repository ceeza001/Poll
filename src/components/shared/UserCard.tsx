import { useState, useEffect} from "react";
import { Models } from "appwrite";

import { Button } from "../ui/button";
import {
  useVote,
} from "@/lib/react-query/queries";


type UserCardProps = {
  candidate: Models.Document;
  voter: Models.Document;
};

const UserCard = ({ candidate, voter }: UserCardProps) => {
  const [voted, setVoted] = useState(false);
  
  const { mutate: vote } = useVote();
  
  useEffect(() => {
    if (voter.candidates && voter.candidates.length !== 0) {
      setVoted(true);
    }
  }, [voter]);


  const handleVote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!voted) {
      vote({ voterId: voter.$id, candidateId: candidate.$id });
      setVoted(true);
      window.location.reload();
    }
  };
  
  return (
    <div className="user-card">
      <img
        src={candidate.imageUrl || "/assets/images/profile.jpg"}
        alt="candidate"
        className="rounded-full w-[9rem]"
      />

      <div className="text-text-color w-full flex flex-col items-start gap-1">
        <p className="flex gap-2 items-center">
          Name: 
          <span className="small-regular text-center line-clamp-1">
            {candidate.name}
          </span>
        </p>
        <p className="flex gap-2 items-center">
          Department: 
          <span className="small-regular text-center line-clamp-1">
            {candidate.department}
          </span>
        </p>
        <p className="mt-4 text-gray-500 subtle-semibold">
          {candidate.manifesto}
        </p>
      </div>

      <Button
        onClick={(e) => handleVote (e)}
        className="w-full shad-button_primary px-5"
        disabled={voted}
      >
        {voted ? "user has voted" : "Vote"}
      </Button>
    </div>
  );
};

export default UserCard;