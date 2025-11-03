import type { Player } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const playerAvatars = PlaceHolderImages.reduce((acc, img) => {
  acc[img.id] = img.imageUrl;
  return acc;
}, {} as Record<string, string>);

export const initialPlayers: Player[] = [
    {
        "id": "1",
        "name": "Virat Kohli",
        "matches": 237,
        "runs": 13027,
        "wickets": 4,
        "avatar": "https://picsum.photos/seed/p1/100/100"
    },
    {
        "id": "2",
        "name": "Rohit Sharma",
        "matches": 243,
        "runs": 9825,
        "wickets": 8,
        "avatar": "https://picsum.photos/seed/p2/100/100"
    }
];
