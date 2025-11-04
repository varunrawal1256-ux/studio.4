"use client";

import { useEffect } from "react";
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
import type { CalculatedPlayer } from "@/lib/types";

const playerSchema = z.object({
  runs: z.coerce.number().int().min(0, { message: "Runs cannot be negative." }),
  wickets: z.coerce
    .number()
    .int()
    .min(0, { message: "Wickets cannot be negative." }),
});

type PlayerFormValues = z.infer<typeof playerSchema>;

interface EditPlayerSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  player: CalculatedPlayer;
  onPlayerUpdate: (player: {
    id: string;
    runs: number;
    wickets: number;
  }) => void;
}

const EditPlayerSheet = ({
  isOpen,
  onOpenChange,
  player,
  onPlayerUpdate,
}: EditPlayerSheetProps) => {
  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      runs: player.runs,
      wickets: player.wickets,
    },
  });

  useEffect(() => {
    if (player) {
      form.reset({
        runs: player.runs,
        wickets: player.wickets,
      });
    }
  }, [player, form]);

  const onSubmit = (data: PlayerFormValues) => {
    onPlayerUpdate({ id: player.id, ...data });
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
              <SheetTitle>Edit Player: {player.name}</SheetTitle>
              <SheetDescription>
                Update the player's statistics below.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 py-4 space-y-4">
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
              <Button type="submit">Save Changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditPlayerSheet;
