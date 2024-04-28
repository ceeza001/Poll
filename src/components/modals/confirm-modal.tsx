import { useState, useEffect} from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const formSchema = z.object({
  key: z.string().min(8),
});

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  children,
  onConfirm
}: ConfirmModalProps) => {
  const [modal, setModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  
  return (
    <div className="w-full">
      {!modal && (
        <Button
          className="w-full shad-button_primary px-5"
          onClick={() => setModal(!modal)}
        >
          vote
        </Button>
      )}
      {modal && (
        <>
          <h2>Are you sure?</h2>
          <p>This action cannot be undone.
          </p>
          
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onConfirm)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="shad-input"
                        disabled={isSubmitting}
                        placeholder="Enter Your Key"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-row justify-between items-center">
                <Button 
                  className="bg-dark-2"
                  onClick={() => setModal(!modal)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-primary-500" type="submit">
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
      </>
      )}
    </div>
  );
};

export default ConfirmModal;
