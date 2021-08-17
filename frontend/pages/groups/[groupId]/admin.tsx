import AdminArea from "../../../features/admin/adminArea";
import { useRouter } from "next/router";
import DashboardLayout from "@components/layouts/dashboardLayout";

const AdminPage: any = () => {
  const router = useRouter();
  const { groupId } = router.query;

  if (typeof groupId !== "string") {
    return <div>Error</div>;
  }

  return <AdminArea groupId={parseInt(groupId as string)} />;
};

AdminPage.Layout = DashboardLayout;

export default AdminPage;
