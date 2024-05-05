import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Models } from "appwrite";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useCreateCandidate } from "@/lib/react-query/queries";

import { CandidatesList } from "./candidates-list";

interface CandidatesFormProps {
  initialData: Models.Document[];
  pollId: string;
};

const formSchema = z.object({
  name: z.string().min(1),
  file: z.custom<File[]>(),
});

export const CandidatesForm = ({
  initialData,
  pollId
}: CandidatesFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setCandidates(initialData.candidates);
  }, []);
  
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file: []
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Query
  const { mutateAsync: createCandidate } =
    useCreateCandidate();

  // Handler
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      const newCandidate = await createCandidate({
        ...value,
        pollId: pollId,
      });

      if (!newCandidate) {
        toast({
          title: `Create Course failed. Please try again.`,
        });
        return; // Exit early if creating chapter fails
      }

      form.reset();
      // Update chapters array with the new chapter
      setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);

      setIsUpdatin(false);
      toggleCreating();
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Something went wrong" });
    }
  }
  

  return (
    <div className="relative shad-textarea mt-6 p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Poll Candidates
        <Button onClick={toggleCreating} className="bg-foreground text-background">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a candidate
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate's name</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      disabled={isSubmitting}
                      placeholder="e.g. 'John Doe'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate's image</FormLabel>
                  <FormControl>
                    <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={initialData?.imageUrl}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="shad-button_primary"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.candidates?.length && "text-slate-500 italic"
        )}>
          {!initialData.candidates?.length && "No candidates"}
          <CandidatesList
            items={candidates || []}
          />
        </div>
      )}
    </div>
  )
}

export default CandidatesForm