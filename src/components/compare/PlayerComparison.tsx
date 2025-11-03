"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, BrainCircuit } from "lucide-react";

import {
  comparePlayers,
  type ComparePlayersOutput,
} from "@/ai/flows/compare-players";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const comparisonSchema = z.object({
  player1Characteristics: z
    .string()
    .min(10, "Please provide more details for player 1."),
  player2Characteristics: z
    .string()
    .min(10, "Please provide more details for player 2."),
  comparisonMetric: z.string().min(3, "Please specify a comparison metric."),
});

type ComparisonFormValues = z.infer<typeof comparisonSchema>;

const PlayerComparison = () => {
  const [result, setResult] = useState<ComparePlayersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ComparisonFormValues>({
    resolver: zodResolver(comparisonSchema),
    defaultValues: {
      player1Characteristics: "",
      player2Characteristics: "",
      comparisonMetric: "Overall performance in T20 format",
    },
  });

  const onSubmit = async (data: ComparisonFormValues) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await comparePlayers(data);
      setResult(response);
    } catch (e) {
      setError("An error occurred while comparing players. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            AI-Powered Player Comparison
          </CardTitle>
          <CardDescription>
            Describe two players and a metric, and our AI will provide a detailed
            analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="player1Characteristics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player 1 Characteristics</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Aggressive right-handed opening batsman, excellent cover drive, captain of Team A...'"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="player2Characteristics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player 2 Characteristics</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Left-arm fast-medium bowler, known for yorkers, economical in death overs...'"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="comparisonMetric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comparison Metric</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Batting average in ODIs', 'Strike rate in powerplay', etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Compare Players"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && <LoadingSkeleton />}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-1/3" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-1/3" />
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  </div>
);

const ResultDisplay = ({ result }: { result: ComparePlayersOutput }) => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-2 gap-6">
      <Card
        className={
          result.winningPlayer === "Player 1"
            ? "border-accent ring-2 ring-accent"
            : ""
        }
      >
        <CardHeader>
          <CardTitle>Player 1</CardTitle>
          <CardDescription>AI Generated Score</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{result.player1Score}</p>
        </CardContent>
        {result.winningPlayer === "Player 1" && (
          <CardFooter>
            <p className="text-sm font-semibold text-accent-foreground bg-accent/80 px-2 py-1 rounded-md">
              Winner
            </p>
          </CardFooter>
        )}
      </Card>
      <Card
        className={
          result.winningPlayer === "Player 2"
            ? "border-accent ring-2 ring-accent"
            : ""
        }
      >
        <CardHeader>
          <CardTitle>Player 2</CardTitle>
          <CardDescription>AI Generated Score</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{result.player2Score}</p>
        </CardContent>
        {result.winningPlayer === "Player 2" && (
          <CardFooter>
            <p className="text-sm font-semibold text-accent-foreground bg-accent/80 px-2 py-1 rounded-md">
              Winner
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Comparison Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{result.comparisonSummary}</p>
      </CardContent>
    </Card>
  </div>
);

export default PlayerComparison;
