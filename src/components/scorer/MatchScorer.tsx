"use client";

import { useState } from "react";
import { Dices, Undo, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MatchScorer = () => {
  const [team1Name, setTeam1Name] = useState("Team A");
  const [team2Name, setTeam2Name] = useState("Team B");
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [overs, setOvers] = useState(0);
  const [history, setHistory] = useState<(string | number)[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [battingTeam, setBattingTeam] = useState(1);

  const oversLimit = 20;

  const handleRun = (run: number) => {
    if (gameOver) return;
    setScore(score + run);
    addBall();
    setHistory([...history, run]);
  };

  const handleWide = () => {
    if (gameOver) return;
    setScore(score + 1);
    setHistory([...history, "Wd"]);
  };

  const handleNoBall = () => {
    if (gameOver) return;
    setScore(score + 1);
    setHistory([...history, "Nb"]);
  };

  const handleWicket = () => {
    if (gameOver) return;
    if (wickets < 10) {
      setWickets(wickets + 1);
      addBall();
      setHistory([...history, "W"]);
      if (wickets + 1 === 10) {
        endInnings();
      }
    }
  };

  const addBall = () => {
    if (balls + 1 === 6) {
      setBalls(0);
      setOvers(overs + 1);
      if (overs + 1 === oversLimit) {
        endInnings();
      }
    } else {
      setBalls(balls + 1);
    }
  };

  const endInnings = () => {
    if (battingTeam === 1) {
      setGameOver(true);
      alert(
        `${team1Name} has finished their innings. Target for ${team2Name} is ${
          score + 1
        }.`
      );
    } else {
      setGameOver(true);
      const winner = score > (history[0] as number) ? team2Name : team1Name;
      alert(`Match over! ${winner} wins.`);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastEvent = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);

    if (typeof lastEvent === "number") {
      setScore(score - lastEvent);
      undoBall();
    } else if (lastEvent === "W") {
      setWickets(wickets - 1);
      undoBall();
    } else if (lastEvent === "Wd" || lastEvent === "Nb") {
      setScore(score - 1);
    }

    if (gameOver) setGameOver(false);
  };

_undoBall = () => {
    if (balls === 0) {
      if (overs > 0) {
        setOvers(overs - 1);
        setBalls(5);
      }
    } else {
      setBalls(balls - 1);
    }
  };

  const handleReset = () => {
    setScore(0);
    setWickets(0);
    setBalls(0);
    setOvers(0);
    setHistory([]);
    setGameOver(false);
    setBattingTeam(1);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Match Scorer
          </CardTitle>
          <CardDescription className="text-center">
            Live Cricket Match Scoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              className="font-semibold text-center"
            />
            <Input
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              className="font-semibold text-center"
            />
          </div>

          <Card className="text-center p-6 bg-gray-50 dark:bg-gray-800">
            <p className="text-lg font-medium text-muted-foreground">
              {battingTeam === 1 ? team1Name : team2Name} Batting
            </p>
            <div className="text-6xl font-bold tracking-tighter">
              {score}/{wickets}
            </div>
            <div className="text-2xl text-muted-foreground">
              Overs: {overs}.{balls} / {oversLimit}
            </div>
          </Card>

          {gameOver && (
            <Alert>
              <Dices className="h-4 w-4" />
              <AlertTitle>Innings Over!</AlertTitle>
              <AlertDescription>
                The innings is complete. You can start the next innings or reset the match.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4, 6].map((run) => (
              <Button key={run} onClick={() => handleRun(run)} disabled={gameOver} variant="outline">
                {run} {run === 1 ? "Run" : "Runs"}
              </Button>
            ))}
            <Button onClick={handleWide} disabled={gameOver} variant="outline">Wide</Button>
            <Button onClick={handleNoBall} disabled={gameOver} variant="outline">No Ball</Button>
          </div>
          <div className="grid grid-cols-1">
            <Button onClick={handleWicket} disabled={gameOver || wickets >= 10} variant="destructive">
              Wicket
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button onClick={handleUndo} variant="secondary" size="icon">
              <Undo className="h-4 w-4" />
            </Button>
            <Button onClick={handleReset} variant="secondary" size="icon">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchScorer;
