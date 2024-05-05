import { Models } from "appwrite"
import { useEffect, useState } from "react";

import { Delete } from "@/components/shared";

interface CandidatesListProps {
  items: Models.Document[];
};

export const CandidatesList = ({
  items,
}: CandidatesListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [candidates, setCandidates] = useState(items);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Sort items by position number in ascending order
    const sortedItems = [...items].sort((a, b) => a.position - b.position);
    setCandidates(sortedItems);
  }, [items]);
  
  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {candidates.map((candidate) => (
        <div 
          key={candidate.$id}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <img 
              src={candidate.imageUrl}
              alt={candidate.name}
              className="w-[2rem] h-[2rem] rounded-lg border border-border"
            />
            <h2>{candidate.name}</h2>
          </div>

          <Delete
             candidate={candidate}
          />
        </div>
      ))}
    </div>
  )
}