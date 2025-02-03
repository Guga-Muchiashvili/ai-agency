import ModelDashboardElement from "@/components/ModelDashboardComponent/ModelDashboardElement";
import { fetchModel } from "@/actions/fetch/fetch";
const Page = async () => {
  const modelData = await fetchModel({ name: "Stasia" });

  return <ModelDashboardElement data={modelData} />;
};

export default Page;
