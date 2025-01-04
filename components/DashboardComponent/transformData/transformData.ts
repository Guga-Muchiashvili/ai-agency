export const transformLeaderboardData = (
  workers:
    | { id: string; name: string; modelId: string; profit: number }[]
    | undefined,
  models:
    | {
        name: string;
        id: string;
      }[]
    | undefined
) => {
  const data = workers?.map((item) => ({
    name: item.name,
    model: models?.filter((model) => model.id == item.modelId)[0].name,
    profit: item.profit,
    id: item.id,
  }));

  return data;
};
