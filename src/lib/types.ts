export type Player = {
  id: string;
  name: string;
  avatar: string;
  matches: number;
  runs: number;
  wickets: number;
};

export type CalculatedPlayer = Player & {
  score: number;
  rank: number;
};
