'use client';

import { useState, useMemo } from 'react';
import { PlusCircle, Share2 } from 'lucide-react';
import { initialPlayers } from '@/lib/data';
import type { Player, CalculatedPlayer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import PlayerRankingsTable from '@/components/players/PlayerRankingsTable';
import PerformanceChart from '@/components/players/PerformanceChart';
import AddPlayerSheet from '@/components/players/AddPlayerSheet';
import { useToast } from '@/hooks/use-toast';

const calculateScore = (player: Player): number => {
  // Weighted formula: 1 point per run, 20 points per wicket
  return player.runs + player.wickets * 20;
};

const Dashboard = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [isAddPlayerSheetOpen, setIsAddPlayerSheetOpen] = useState(false);
  const { toast } = useToast();

  const calculatedPlayers = useMemo((): CalculatedPlayer[] => {
    const playersWithScores = players.map((p) => ({
      ...p,
      score: calculateScore(p),
    }));

    playersWithScores.sort((a, b) => b.score - a.score);

    return playersWithScores.map((p, index) => ({
      ...p,
      rank: index + 1,
    }));
  }, [players]);

  const handleAddPlayer = (newPlayer: Omit<Player, 'id' | 'avatar'>) => {
    const newPlayerWithId: Player = {
      ...newPlayer,
      id: (players.length + 1).toString(),
      avatar: `https://picsum.photos/seed/p${players.length + 1}/100/100`,
    };
    setPlayers((prevPlayers) => [...prevPlayers, newPlayerWithId]);
    setIsAddPlayerSheetOpen(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Cricket Stats Hub',
      text: 'Check out my cricket player rankings!',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: 'Link Copied!',
          description: 'The link to the rankings has been copied to your clipboard.',
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: 'Could not copy the link to your clipboard.',
        });
      }
    }
  };

  const topPlayers = useMemo(
    () => calculatedPlayers.slice(0, 5),
    [calculatedPlayers]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight self-start sm:self-center">Player Rankings</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <Button onClick={handleShare} variant="outline" className="w-full sm:w-auto">
            <Share2 />
            Share
          </Button>
          <Button onClick={() => setIsAddPlayerSheetOpen(true)} className="w-full sm:w-auto">
            <PlusCircle />
            Add Player
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <PlayerRankingsTable players={calculatedPlayers} />
        </div>
        <div className="md:col-span-1">
          <PerformanceChart players={topPlayers} />
        </div>
      </div>

      <AddPlayerSheet
        isOpen={isAddPlayerSheetOpen}
        onOpenChange={setIsAddPlayerSheetOpen}
        onPlayerAdd={handleAddPlayer}
      />
    </div>
  );
};

export default Dashboard;
