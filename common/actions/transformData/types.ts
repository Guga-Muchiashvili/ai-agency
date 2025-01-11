export interface ITransformLeaderboardDataProps {
  workers:
    | { id: string; name: string; modelId: string; profit: number | string }[]
    | undefined;
  models:
    | {
        name?: string;
        id?: string;
      }[]
    | undefined;
}
