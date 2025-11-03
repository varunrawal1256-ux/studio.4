import type { Player } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const playerAvatars = PlaceHolderImages.reduce((acc, img) => {
  acc[img.id] = img.imageUrl;
  return acc;
}, {} as Record<string, string>);

export const initialPlayers: Player[] = [];
