import ModelDashboardElement from "@/components/ModelDashboardComponent/ModelDashboardElement";
import {
  fetchEarningsByModel,
  fetchModel,
  fetchModelDashboardData,
  fetchUsers,
} from "@/actions/fetch/fetch";
const Page = async () => {
  const data = await fetchModelDashboardData({ name: "Elenka" });
  const modelData = await fetchModel({ name: "Elenka" });
  const workersData = await fetchUsers();
  const earningData = await fetchEarningsByModel({ id: modelData?.id });

  console.log(data);

  return (
    <ModelDashboardElement
      earningData={earningData}
      data={modelData}
      workers={workersData}
    />
  );
};

export default Page;
