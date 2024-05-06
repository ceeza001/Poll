import { useState, useEffect } from "react";
import { Models } from "appwrite";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetUsers } from "@/lib/react-query/queries";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVote } from "@/lib/react-query/queries";
import { Button } from "@/components/ui";

type UserCardProps = {
  candidate: Models.Document | null;
};

const formSchema = z.object({
  id: z.string().min(10, {
    message: "id must be 10 characters long",
  }).max(10, {
    message: "id is invalid",
  }),
});

const CandidateCard = ({ candidate }: UserCardProps) => {
  const voteList = candidate?.votes.map((vote: string) => vote);
  const [voteModal, setVoteModal] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState<string[]>(voteList);
  const [matchedUser, setMatchedUser] = useState();
  
  const { data: users } = useGetUsers();
  const { mutate: vote } = useVote();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: '' }, // Initialize id field with an empty string
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    if (isValid && users) {
      const matchedUser = users.documents.find(user => user.voterId === form.watch('id'));
      if (matchedUser) {
        setMatchedUser(matchedUser);
      }
    }
  }, [isValid, users, form.watch('id')]);
  
  const handleVote = async (value: z.infer<typeof formSchema>) => {
  if (!voted && candidate) {
    if (!votes.includes(value.id)) { // Check if value.id is not already in votesArray
      let votesArray = [...votes];

      votesArray.push(value.id);
      setVotes(votesArray);
      // Perform the vote mutation
      vote({ votes: votesArray, candidateId: candidate.$id });
      // Set voted status to true
      setVoted(true);
      localStorage.setItem('voted', candidate.$id);
      window.location.reload();
    }
  }
};

  return (
    <div className="bg-card w-full shadow-md border flex flex-col justify-between rounded-lg p-2">
      {candidate && (
        <>
          <div>
            <img
              src={candidate.imageUrl}
              alt="candidate"
              className="rounded-lg w-full aspect-video"
            />

            <div className="text-dark-2 w-full flex flex-col justify-between gap-1 mt-4">
              <h2 className="text-[12px] font-bold">{candidate.name}</h2>
            </div>
          </div>

          <p className="mt-2 text-gray-500 subtle-semibold">
            {candidate.slogan}
          </p>
          
          <Button
            onClick={() => setVoteModal(!voteModal)}
            className="w-full shad-button_primary px-5"
            disabled={voted}
          >
            {voted ? 'Already Voted' : 'Vote'}
          </Button>

          {voteModal && (
            <div className="flex-col flex-center fixed top-0 left-0 right-0 px-4 z-[50] w-screen h-screen bg-[#000000]/70">
              <div className="bg-background p-2 rounded-lg border shadow-md h-fit w-full mx-auto">
                <h2 className="text-[14px] text-center font-bold">
                  Are you sure you want to vote for {candidate.name}?
                </h2>

                <div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleVote)}
                      className="space-y-4 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter your voters ID</FormLabel>
                            <FormControl>
                              <Input
                                className="shad-input"
                                disabled={isSubmitting}
                                type="number"
                                placeholder="e.g. '123 - 4467 - 89'"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red" />
                          </FormItem>
                       )}
                      />
                      
                      <div className="flex items-center gap-x-2">
                        <Button
                          className="bg-red-500"
                          onClick={() => setVoteModal(!voteModal)}
                          type="button"
                        >
                          Cancel
                       </Button>

                        <Button
                          className="shad-button_primary"
                          disabled={!isValid || isSubmitting}
                          type="submit"
                        >
                          Confirm
                       </Button>
                    </div>
                  </form>
                </Form>
                </div>
              </div>
              {isValid && users && users.documents.some(user => user.voterId === form.watch('id')) && (
                <>
                  {matchedUser && (
                    <div className="fixed top-4 bg-background p-2 rounded-lg z-[50] flex gap-2">
                      <div className="flex gap-2 items-center">
                        <img 
                          src={matchedUser.imageUrl}
                          className="w-[2.5rem] h-[2.5rem] rounded-full "
                          alt="User"
                        />
                        <div>
                          <h2 className="font-bold">{matchedUser.name}</h2>
                          <p>voter's id: {matchedUser.voterId}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateCard;