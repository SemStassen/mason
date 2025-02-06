"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLiveQuery } from "@mason/db/client/hooks";
import type { LiveQuery } from "@mason/db/client/pglite";
import type { UserType } from "@mason/db/client/schema";
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
import { useToast } from "@mason/ui/use-toast";
import { useForm } from "react-hook-form";

interface userFormProps {
  liveUserMe: LiveQuery<UserType>;
}

export function UserForm({ liveUserMe }: userFormProps) {
  const user = useLiveQuery(liveUserMe);

  if (!user.rows[0]) {
    return <div>ERROR</div>;
  }

  const { username } = user.rows[0];

  const form = useForm({
    resolver: zodResolver(patchUserSchema),
    values: {
      username: username,
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    const { toast } = useToast();
  });

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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
