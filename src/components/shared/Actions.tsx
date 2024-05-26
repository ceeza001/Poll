import { Models } from "appwrite"
import { Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui";
import { useUpdatePoll, useDeletePoll } from "@/lib/react-query/queries";
import ConfirmModal from "@/components/modals/confirm-modal";

interface ActionsProps {
  disabled: boolean;
  poll: Models.Document;
  isPublished: boolean;
};

export const Actions = ({
  disabled,
  poll,
  isPublished,
}: ActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

    // Queries
  const { mutateAsync: updatePoll } =
    useUpdatePoll();
  const { mutate: deletePoll } = useDeletePoll();
  
  const onClick = async () => {
    try {
      setIsLoading(true);
      const updatedPoll = await updatePoll({
        pollId: poll.$id,
        title: poll.title, // Assuming initialData has title property
        description: poll.description,
        isPublished: !isPublished,
      });

      if (!updatedPoll) {
        console.error("Failed. Please try again.", Error);

        return;
      }
    } catch {
      toast({ title:"Something went wrong"});
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);
      
      deletePoll({ pollId: poll.$id, fileId: poll.imageId });
      console.log("deleting...");
      
      toast({ title: "Course deleted" });
      navigate(`/polls`);
    } catch {
      toast({ title: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="shad-button_primary"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className="bg-red-500/80 border border-red-30">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}