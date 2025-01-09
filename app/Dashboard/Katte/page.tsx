import ModelDashboardElement from "@/components/ModelDashboardComponent/ModelDashboardElement";
import { fetchModel } from "@/actions/fetch/fetch";
const Page = async () => {
  const modelData = await fetchModel({ name: "Katte" });

  return <ModelDashboardElement data={modelData} />;
};

export default Page;
