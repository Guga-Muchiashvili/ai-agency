import ModelDashboardElement from "@/components/ModelDashboardComponent/ModelDashboardElement";
import {
  fetchEarningsByModel,
  fetchModel,
  fetchUsers,
} from "@/actions/fetch/fetch";
const Page = async () => {
  const modelData = await fetchModel({ name: "Elenka" });
  const workersData = await fetchUsers();
  const earningData = await fetchEarningsByModel({ id: modelData?.id });

  return (
    <ModelDashboardElement
      earningData={earningData}
      data={modelData}
      workers={workersData}
    />
  );
};

export default Page;
