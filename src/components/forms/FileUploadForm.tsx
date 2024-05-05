import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import MuxPlayer from '@mux/mux-player-react';

import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/shared";
import { useUpdatePoll } from "@/lib/react-query/queries";

interface FileUploadFormProps {
  initialData: { imageUrl: string };
  pollId: string;
  type: string;
}

const formSchema = z.object({
  file: z.custom<File[]>(),
});

const FileUploadForm = ({ initialData, courseId, type }: FileUploadFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: []
    },
  });

  // Queries
  const { mutateAsync: updatePoll, isPending: isLoadingUpdate } = useUpdateCourse();

  // Handler
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const updatedPoll = await updatePoll({
        pollId: pollId,
        file: value.file,
      });

      if (!updatedPoll) {
        toast({ title: "Failed. Please try again." });
        return;
      }
      
      toast({ title: "Course updated" });
      toggleEdit();
    } catch {
      toast({ title: "Something went wrong" });
    }
  };

  return (
    <div className="mt-6 shad-textarea p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} className="text-background bg-foreground">
          {isEditing ? (
            <>Cancel</>
          ) : !initialData.imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add {type === "Image" ? "an image" : "a video"}
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit {type === "Image" ? "image" : "video"}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-2">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {type === "video" ? (
              <img
                alt="Upload"
                className="file_uploader-img"
                src={initialData.imageUrl}
              />
            ) : (
              <MuxPlayer
                playbackId={initialData?.muxData?.playbackId || ""}
              /> 
            )}
          </div>
        )
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 aspect-video"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      fieldChange={(file: File[]) => {
                        onSubmit({ file }); // Call onSubmit when fieldChange occurs
                     }}
                      mediaUrl={initialData?.imageUrl}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default FileUploadForm;