import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button, Input } from "@/components/ui";
import { useCreatePoll } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Query
  const { mutateAsync: createPoll, isPending: isLoadingCreate } =
    useCreatePoll();

  // Handler
  const handleCreatePoll = async (value: z.infer<typeof formSchema>) => {
    const newPoll = await createPoll({
      ...value,
      userId: user.id,
    });

    if (!newPoll) {
      toast({
        title: `Create Poll failed. Please try again.`,
      });
    }
    navigate(`/edit/polls/${newPoll.$id}`);
  }
    
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your poll
        </h1>
        <p className="text-sm text-dim">
          What would you like to name your poll? Don&apos;t worry, you can change this later.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreatePoll)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Poll title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      disabled={isSubmitting}
                      placeholder="e.g. '2023 Presidential Election'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link to="/">
                <Button
                  type="button"
                  className="shad-button_dark"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="shad-button_primary"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Create