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
  uses24HourClock,
}: { weekStartsOnMonday: boolean; uses24HourClock: boolean }) {
  const { toast } = useToast();
  const updateAction = useAction(updateUserPreferencesAction, {
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
      uses24HourClock: uses24HourClock,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    updateAction.execute({
      weekStartsOnMonday: data.weekStartsOnMonday,
      uses24HourClock: data.uses24HourClock,
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
        <FormField
          control={form.control}
          name="uses24HourClock"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-0.5">
                <FormLabel>Time format</FormLabel>
              </div>
              <FormControl>
                <ToggleGroup
                  type="single"
                  onValueChange={(val) => field.onChange(val === "24-hour")}
                  defaultValue={field.value ? "24-hour" : "12-hour"}
                >
                  <ToggleGroupItem value="12-hour">12-hour</ToggleGroupItem>
                  <ToggleGroupItem value="24-hour">24-hour</ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={updateAction.isExecuting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
