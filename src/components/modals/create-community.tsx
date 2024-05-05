import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button, Input, Textarea} from "@/components/ui";
import { useCreateCommunity } from "@/lib/react-query/queries";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { ProfileUploader, Loader } from "@/components/shared";

const formSchema = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

interface CreateCommunityProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  children,
  onConfirm
}: CreateCommunityProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
      name: "",
      description: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Query
  const { mutateAsync: createCommunity, isPending: isLoadingCreate } =
    useCreateCommunity();

  // Handler
  const handleCreateCommunity = async (value: z.infer<typeof formSchema>) => {
    const newCommunity = await createCommunity({
      ...value,
      creator: user.id,
      file: value.file,
    });

    if (!newCommunity) {
      toast({
        title: `Create Community failed. Please try again.`,
      });
    }
    navigate(`/community/${newCommunity.$id}`);
  }
    
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[100dvh] md:h-fit">
        <AlertDialogHeader className="text-left">
          <AlertDialogCancel className="w-fit  bg-transparent dark:bg-transparent border-0 p-0">
            <X />
          </AlertDialogCancel>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateCommunity)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="overflow-hidden">
                    <FormControl>
                      <ProfileUploader
                        fieldChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Community Name
                    </FormLabel>
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your community. Including a description is useful for your members."
                        className="shad-textarea"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-end items-center gap-x-2">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="bg-foreground text-background"
                >
                  Create Community
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateCommunity;
