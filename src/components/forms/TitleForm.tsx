import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdatePoll } from "@/lib/react-query/queries";

interface TitleFormProps {
  initialData: {
    title: string;
    description?: string; // Add description property
    isPublished?: boolean; // Add isPublished property
  };
  pollId: string;
  type: string;
}


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({
  initialData,
  pollId,
  type
}: TitleFormProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  // Queries
  const { mutateAsync: updatePoll } =
    useUpdatePoll();
  
  // Handler
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      if (type === "Poll") {
        const updatedPoll = await updatePoll({
          pollId: pollId,
          title: value.title, // Assuming initialData has title property
          description: initialData.description,
          isPublished: initialData.isPublished, // Assuming initialData has isPublished property
        });

        if (!updatedPoll) {
          toast({ title: "Failed. Please try again." });

          return;
        }
        toast({title: "Course updated"});
        toggleEdit();
      }
    } catch {
      toast({ title: "Something went wrong" });
    }
  }

  return (
    <div className="shad-input mt-6 p-4">
      <div className="font-medium flex items-center justify-between">
        {type} title
        <Button onClick={toggleEdit} className="bg-foreground text-background">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.title}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="shad-input"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
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

export default TitleForm