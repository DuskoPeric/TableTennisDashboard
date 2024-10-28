export type PlayerScore = {
  points: number;
  won: number;
  lost: number;
};

export type Player = {
  name: string;
  id: number;
  email: string;
  playerScore: PlayerScore;
};

export type PlayerState={
  players:Player[],
  sort:string,
  searchTerm:string
}