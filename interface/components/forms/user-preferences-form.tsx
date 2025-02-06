"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@mason/db/client/db";
import { useLiveQuery, useSubscription } from "@mason/db/client/hooks";
import type { LiveQuery } from "@mason/db/client/pglite";
import type { UserPreferenceType } from "@mason/db/client/schema";
import { patchUserPreferencesSchema } from "@mason/trpc/schema";
import { Button } from "@mason/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mason/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@mason/ui/toggle-group";
import { useToast } from "@mason/ui/use-toast";
import { useForm } from "react-hook-form";

interface UserPreferencesFormProps {
  liveUserMePreferences: LiveQuery<UserPreferenceType>;
}

export function UserPreferencesForm({
  liveUserMePreferences,
}: UserPreferencesFormProps) {
  const userPreference = useLiveQuery(liveUserMePreferences);

  if (!userPreference.rows[0]) {
    return <div>ERROR</div>;
  }

  const { week_starts_on_monday, uses_24_hour_clock } = userPreference.rows[0];

  const form = useForm({
    resolver: zodResolver(patchUserPreferencesSchema),
    values: {
      weekStartsOnMonday: week_starts_on_monday,
      uses24HourClock: uses_24_hour_clock,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await fetch("http://localhost:8002/api/v1/user-preferences", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(res);
  });
  const { toast } = useToast();

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
                  value={field.value ? "monday" : "sunday"}
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
                  value={field.value ? "24-hour" : "12-hour"}
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
