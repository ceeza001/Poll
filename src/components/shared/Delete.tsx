import { Models } from "appwrite"
import { Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui";
import { useDeleteCandidate } from "@/lib/react-query/queries";
import ConfirmModal from "@/components/modals/confirm-modal";

interface DeleteProps {
  candidate: Models.Document;
};

export const Delete = ({
  candidate,
}: DeleteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteCandidate } = useDeleteCandidate();

  const onDelete = async () => {
    try {
      setIsLoading(true);

      deleteCandidate({ candidateId: candidate.$id, fileId: candidate.imageId });
      
      toast({ title: "Course deleted" });
      navigate(0);
      
    } catch {
      toast({title: "Something went wrong"});
    } finally {
      setIsLoading(false);
      
    }
  }

  return (
    <>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className="border border-red-30">
          <Trash className="h-4 w-4 text-red-500/80" />
        </Button>
      </ConfirmModal>
    </>
  )
}