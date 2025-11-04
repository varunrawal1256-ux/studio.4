"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpDown, Trophy, Pencil } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { CalculatedPlayer } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortKey = "rank" | "score" | "runs" | "wickets" | "matches";

interface PlayerRankingsTableProps {
  players: CalculatedPlayer[];
  onEditPlayer: (player: CalculatedPlayer) => void;
}

const PlayerRankingsTable = ({ players, onEditPlayer }: PlayerRankingsTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "rank", direction: "ascending" });

  const sortedPlayers = useMemo(() => {
    let sortablePlayers = [...players];
    if (sortConfig !== null) {
      sortablePlayers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePlayers;
  }, [players, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader = ({
    sortKey,
    children,
  }: {
    sortKey: SortKey;
    children: React.ReactNode;
  }) => (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => requestSort(sortKey)}
        className="-ml-4"
      >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader sortKey="rank">Rank</SortableHeader>
          <TableHead>Player</TableHead>
          <SortableHeader sortKey="runs">Runs</SortableHeader>
          <SortableHeader sortKey="wickets">Wickets</SortableHeader>
          <SortableHeader sortKey="matches">Matches</SortableHeader>
          <SortableHeader sortKey="score">Score</SortableHeader>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPlayers.map((player) => (
          <TableRow
            key={player.id}
            className={cn(
              player.rank === 1 && "bg-accent/10 hover:bg-accent/20"
            )}
          >
            <TableCell
              className={cn(
                "font-bold text-lg",
                player.rank === 1 && "text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                {player.rank}
                {player.rank === 1 && (
                  <Trophy className="h-5 w-5 text-accent" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{player.name}</span>
              </div>
            </TableCell>
            <TableCell>{player.runs.toLocaleString()}</TableCell>
            <TableCell>{player.wickets.toLocaleString()}</TableCell>
            <TableCell>{player.matches.toLocaleString()}</TableCell>
            <TableCell className="font-semibold">
              {player.score.toLocaleString()}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onEditPlayer(player)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Player</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayerRankingsTable;
