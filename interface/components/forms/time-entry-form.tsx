"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { patchTimeEntrySchema } from "@mason/trpc/schema";
import { Button } from "@mason/ui/button";
import { Calendar } from "@mason/ui/calendar";
import { cn } from "@mason/ui/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mason/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mason/ui/form";
import { Icons } from "@mason/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@mason/ui/popover";
import { Separator } from "@mason/ui/separator";
import { Textarea } from "@mason/ui/textarea";
import { Time } from "@mason/ui/time";
import { ToastAction } from "@mason/ui/toast";
import { useToast } from "@mason/ui/use-toast";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
// import { deleteTimeEntryAction } from "@/actions/delete-time-entry-action";
// import {
//   type UpdateTimeEntrySchemaType,
//   updateTimeEntrySchema,
// } from "@/actions/schema";
// import { updateTimeEntryAction } from "@/actions/update-time-entry-action";
// import { useProjectsStore } from "@/stores/projects-store";
import { convertToLocalDate } from "~/utils/dates";

interface TimeEntryFormProps {
  uuid: string;
  projectUuid: string;
  startedAt: string;
  stoppedAt: string | null;
  note: string | null;
}

export function TimeEntryForm({
  uuid,
  projectUuid,
  startedAt,
  stoppedAt,
  note,
}: TimeEntryFormProps) {
  const { toast } = useToast();
  // const deleteAction = useAction(deleteTimeEntryAction, {
  //   onSuccess: () => {
  //     toast({ title: "Time entry deleted succesfully!" });
  //   },
  //   onError: () => {
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to delete time entry",
  //       action: (
  //         <ToastAction
  //           altText="Retry"
  //           onClick={() => {
  //             onSubmit();
  //           }}
  //         >
  //           Retry
  //         </ToastAction>
  //       ),
  //     });
  //   },
  // });
  // const updateAction = useAction(updateTimeEntryAction, {
  //   onSuccess: () => {
  //     toast({ title: "Time entry updated succesfully!" });
  //   },
  //   onError: () => {
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to update time entry",
  //       action: (
  //         <ToastAction
  //           altText="Retry"
  //           onClick={() => {
  //             onSubmit();
  //           }}
  //         >
  //           Retry
  //         </ToastAction>
  //       ),
  //     });
  //   },
  // });

  const form = useForm({
    resolver: zodResolver(patchTimeEntrySchema),
    defaultValues: {
      uuid: uuid ?? undefined,
      projectUuid: projectUuid ?? undefined,
      startedAt: startedAt ?? undefined,
      stoppedAt: stoppedAt ?? undefined,
      note: note ?? undefined,
    },
  });

  const handleDelete = () => {
    //   deleteAction.execute({
    //     uuid: uuid,
    //   });
  };

  const onSubmit = form.handleSubmit((data) => {
    //   updateAction.execute({
    //     uuid: data.uuid,
    //     projectUuid: data.projectUuid,
    //     startedAt: data.startedAt,
    //     stoppedAt: data.stoppedAt,
    //     note: data.note,
    //   });
  });
  return (
    <Form {...form}>
      <form className="relative space-y-4 h-full" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="projectUuid"
          render={({ field }) => (
            <FormItem className="grow flex flex-col">
              <FormLabel className="sr-only">Project</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {/* {field.value ? (
                        <span className="flex items-center gap-2">
                          <Icons.DotFilled
                            color={
                              projects.find(
                                (project) => project.uuid === field.value,
                              )?.hexColor
                            }
                          />
                          {
                            projects.find(
                              (project) => project.uuid === field.value,
                            )?.name
                          }
                        </span>
                      ) : (
                        "Select project"
                      )} */}

                      <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0"
                  style={{
                    width: "var(--radix-popover-trigger-width)",
                  }}
                >
                  <Command>
                    <CommandInput
                      placeholder="Search project..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No project found.</CommandEmpty>
                      <CommandGroup>
                        {/* {projects.map((project) => (
                          <CommandItem
                            value={project.name}
                            key={project.uuid}
                            onSelect={() => {
                              form.setValue("projectUuid", project.uuid);
                            }}
                          >
                            <Icons.DotFilled color={project.hexColor} />
                            {project.name}
                            <Icons.Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                project.uuid === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))} */}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex gap-6">
          <div className="h-10 flex items-center">
            <Icons.Clock />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="startedAt"
              render={({ field }) => (
                <>
                  <div className="flex gap-2">
                    <FormItem>
                      <FormLabel className="w-10">Start</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[140px] pl-3 justify-start font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "eee, dd MMM")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={convertToLocalDate(field.value)}
                            onSelect={(val) => {
                              field.onChange(val?.toISOString());
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[80px] pl-3 justify-start font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "HH:mm")
                              ) : (
                                <span>--:--</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Time
                            value={convertToLocalDate(field.value)}
                            onChange={(val) => {
                              field.onChange(val?.toISOString());
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  </div>
                  <FormMessage />
                </>
              )}
            />
            <FormField
              control={form.control}
              name="stoppedAt"
              render={({ field }) => (
                <>
                  <div className="flex gap-2">
                    <FormItem>
                      <FormLabel className="w-10">End</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[140px] pl-3 justify-start font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "eee, dd MMM")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={convertToLocalDate(field.value)}
                            onSelect={(val) => {
                              field.onChange(val?.toISOString());
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[80px] pl-3 justify-start font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "HH:mm")
                              ) : (
                                <span>--:--</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Time
                            value={convertToLocalDate(field.value)}
                            onChange={(val) => {
                              field.onChange(val?.toISOString());
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  </div>
                  <FormMessage />
                </>
              )}
            />
            <Separator />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="h-10 flex items-center">
            <Icons.Note />
          </div>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="w-10 mt-2 sr-only">Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Note"
                    className="resize-none min-h-40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="absolute bottom-0 right-0">
          <div className="flex gap-2">
            <Button variant="destructive" type="button" onClick={handleDelete}>
              <Icons.Trash className="w-5 h-5" />
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
