"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { patchUserSchema } from "@mason/trpc/schema";
import { Button } from "@mason/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mason/ui/form";
import { Input } from "@mason/ui/input";
import { ToastAction } from "@mason/ui/toast";
import { useToast } from "@mason/ui/use-toast";
import { useForm } from "react-hook-form";
import { trpc } from "~/utils/trpc";

export function UserForm() {
  const { data: userData } = trpc.user.get.useQuery();
  const mutation = trpc.user.patch.useMutation({
    onSuccess: () => {
      toast({ title: "Profile updated succesfully!" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        action: (
          <ToastAction
            altText="Retry"
            onClick={() => {
              onSubmit();
            }}
          >
            Retry
          </ToastAction>
        ),
      });
    },
  });
  const form = useForm({
    resolver: zodResolver(patchUserSchema),
    values: {
      username: userData?.username ?? "",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate({
      username: data.username,
    });
  });
  const { toast } = useToast();

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex gap-4 items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="text-sm leading-none">Email</div>
            <div className="text-sm text-muted-foreground">
              Your primary point of contact
            </div>
          </div>
          <div>semstassen@gmail.com</div>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-0.5">
                <FormLabel>Username</FormLabel>
                <FormDescription>Max. 32 characters</FormDescription>
                <FormMessage />
              </div>
              <FormControl {...field}>
                <Input
                  className="max-w-[300px]"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  maxLength={32}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
