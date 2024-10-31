"use client";

import {
  type UpdateUserPreferencesSchemaType,
  updateUserPreferencesSchema,
} from "@/actions/schema";
import { updateUserPreferencesAction } from "@/actions/update-user-preferences-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mason/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mason/ui/form";
import { ToastAction } from "@mason/ui/toast";
import { ToggleGroup, ToggleGroupItem } from "@mason/ui/toggle-group";
import { useToast } from "@mason/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

export function UserPreferencesForm({
  weekStartsOnMonday,
}: { weekStartsOnMonday: boolean }) {
  const { toast } = useToast();
  const action = useAction(updateUserPreferencesAction, {
    onSuccess: () => {
      toast({ title: "Preferences updated succesfully!" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to update preferences",
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
  const form = useForm<UpdateUserPreferencesSchemaType>({
    resolver: zodResolver(updateUserPreferencesSchema),
    defaultValues: {
      weekStartsOnMonday: weekStartsOnMonday,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute({
      weekStartsOnMonday: data.weekStartsOnMonday,
    });
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="weekStartsOnMonday"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-0.5">
                <FormLabel>Start of week</FormLabel>
              </div>
              <FormControl>
                <ToggleGroup
                  type="single"
                  onValueChange={(val) => field.onChange(val === "monday")}
                  defaultValue={field.value ? "monday" : "sunday"}
                >
                  <ToggleGroupItem value="sunday">Sunday</ToggleGroupItem>
                  <ToggleGroupItem value="monday">Monday</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={action.isExecuting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
