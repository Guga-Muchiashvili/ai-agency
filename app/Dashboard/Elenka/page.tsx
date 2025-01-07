import ModelDashboardElement from "@/components/ModelDashboardComponent/ModelDashboardElement";
import { fetchModel, fetchUsers } from "@/actions/fetch/fetch";
const Page = async () => {
  const modelData = await fetchModel({ name: "Elenka" });
  const workersData = await fetchUsers();

  return <ModelDashboardElement data={modelData} workers={workersData} />;
};

export default Page;
