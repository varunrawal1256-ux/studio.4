import type { Player } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const playerAvatars = PlaceHolderImages.reduce((acc, img) => {
  acc[img.id] = img.imageUrl;
  return acc;
}, {} as Record<string, string>);

export const initialPlayers: Player[] = [
  {
    id: "1",
    name: "Virat Kohli",
    avatar: playerAvatars["player1"],
    matches: 205,
    runs: 6283,
    wickets: 4,
  },
  {
    id: "2",
    name: "Rohit Sharma",
    avatar: playerAvatars["player2"],
    matches: 213,
    runs: 5611,
    wickets: 15,
  },
];
