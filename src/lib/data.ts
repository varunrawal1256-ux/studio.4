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
    avatar: playerAvatars["player1"] || `https://picsum.photos/seed/p1/100/100`,
    matches: 223,
    runs: 7263,
    wickets: 4,
  },
  {
    id: "2",
    name: "Rohit Sharma",
    avatar: playerAvatars["player2"] || `https://picsum.photos/seed/p2/100/100`,
    matches: 227,
    runs: 5968,
    wickets: 15,
  },
];
