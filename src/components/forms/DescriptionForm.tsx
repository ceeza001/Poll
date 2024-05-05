import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Models } from "appwrite";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePoll } from "@/lib/react-query/queries";

interface DescriptionFormProps {
  initialData: Models.Document;
  pollId: string;
};

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

const DescriptionForm = ({
  initialData,
  pollId
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Queries
  const { mutateAsync: updatePoll } =
    useUpdatePoll();

  // Handler
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const updatedPoll = await updatePoll({
        pollId: pollId,
        title: initialData.title, // Assuming initialData has title property
        description: value.description,
        isPublished: initialData.isPublished, // Assuming initialData has isPublished property
      });
      
      if (!updatedPoll) {
        toast({ title: "Failed. Please try again." });

        return;
      }
      toast({title: "Course updated"});
      toggleEdit();
    } catch {
      toast({ title: "Something went wrong" });
    }
  }

  return (
    <div className="shad-textarea mt-6 p-4">
      <div className="font-medium flex items-center justify-between">
        Poll description
        <Button onClick={toggleEdit} className="bg-foreground text-background">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.description && "text-slate-500 italic"
        )}>
          {initialData.description || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="shad-textarea"
                      disabled={isSubmitting}
                      placeholder="e.g. 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                className="shad-button_primary"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default DescriptionForm;