"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Player } from "@/lib/types";

const playerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  matches: z.coerce
    .number()
    .int()
    .min(0, { message: "Matches cannot be negative." }),
  runs: z.coerce.number().int().min(0, { message: "Runs cannot be negative." }),
  wickets: z.coerce
    .number()
    .int()
    .min(0, { message: "Wickets cannot be negative." }),
});

type PlayerFormValues = z.infer<typeof playerSchema>;

interface AddPlayerSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPlayerAdd: (player: Omit<Player, "id" | "avatar">) => void;
}

const AddPlayerSheet = ({
  isOpen,
  onOpenChange,
  onPlayerAdd,
}: AddPlayerSheetProps) => {
  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: "",
      matches: 0,
      runs: 0,
      wickets: 0,
    },
  });

  const onSubmit = (data: PlayerFormValues) => {
    onPlayerAdd(data);
    form.reset();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <SheetHeader>
              <SheetTitle>Add New Player</SheetTitle>
              <SheetDescription>
                Enter the details for the new player. Their rank will be
                calculated automatically.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 py-4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="matches"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matches Played</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="runs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Runs</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Wickets</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Add Player</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddPlayerSheet;
