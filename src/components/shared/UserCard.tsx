import { useState } from "react";
import { Models } from "appwrite";
import * as z from "zod";

import {
  useVote,
  useGetVoters
} from "@/lib/react-query/queries";
import ConfirmModal from "@/components/modals/confirm-modal";


type UserCardProps = {
  candidate: Models.Document;
};

const formSchema = z.object({
  key: z.string().min(8),
});
const UserCard = ({ candidate }: UserCardProps) => {
  const [voted, setVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: vote } = useVote();
  const {
    data: voters,
  } = useGetVoters(75);


  const handleVote = async (value: z.infer<typeof formSchema>) => {
  if (!voted) {
    // Check if the value.key matches any voter's accountId
    const matchingVoters = voters?.documents.filter((voter) => voter.accountId === value.key);
    
    if (matchingVoters && matchingVoters?.length > 0) {
      // Check if the first matching voter has not voted for any candidate
      const validVoters = matchingVoters[0].candidates === null;
      if (validVoters) {
        // Allow the user to vote using the $id of the first matching voter
        vote({ voterId: matchingVoters[0].$id, candidateId: candidate.$id });
        setVoted(true);
        setErrorMessage("");
      } else {
        // Display an error message or handle the case where the user has already voted
        setErrorMessage('You are not allowed to vote. You have already voted.');
        setVoted(false);
      }
    } else {
      // Display an error message or handle the case where the user is not allowed to vote
      setErrorMessage('You are not allowed to vote. Incorrect key.');
      setVoted(false);
    }
  }
};

  return (
    <div className="user-card">
      <img
        src={`/assets/candidates/${candidate.imageUrl}.jpg`}
        alt="candidate"
        className="rounded-full w-[9rem] h-[9rem]"
      />

      <div className="text-text-color w-full flex flex-col items-start gap-1">
        <p className="flex gap-2 items-center">
          Name: 
          <span className="small-regular text-center line-clamp-1">
            {candidate.name}
          </span>
        </p>
        
        <p className="mt-4 text-gray-500 subtle-semibold">
          In our academic community, every voice matters, and we commit to fostering engagement through inclusive voting.
        </p>
      </div>

      <ConfirmModal onConfirm={handleVote} />
      {voted && (
        <p className="small-regular text-green-500">Voted Successfully</p>
      )}
      {errorMessage && (
        <p className="small-regular text-red">{errorMessage}</p>
      )}
    </div>
  );
};

export default UserCard;