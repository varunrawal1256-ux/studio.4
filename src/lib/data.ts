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
  {
    id: "3",
    name: "Jasprit Bumrah",
    avatar: playerAvatars["player3"],
    matches: 106,
    runs: 57,
    wickets: 130,
  },
  {
    id: "4",
    name: "KL Rahul",
    avatar: playerAvatars["player4"],
    matches: 94,
    runs: 3273,
    wickets: 0,
  },
  {
    id: "5",
    name: "Rashid Khan",
    avatar: playerAvatars["player5"],
    matches: 83,
    runs: 222,
    wickets: 102,
  },
  {
    id: "6",
    name: "Sunil Narine",
    avatar: playerAvatars["player6"],
    matches: 148,
    runs: 1025,
    wickets: 152,
  },
  {
    id: "7",
    name: "Andre Russell",
    avatar: playerAvatars["player7"],
    matches: 96,
    runs: 1700,
    wickets: 81,
  },
];
