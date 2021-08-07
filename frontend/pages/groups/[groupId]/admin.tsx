import AdminArea from "../../../features/admin/adminArea";
import { useRouter } from "next/router";
import DashboardLayout from "@components/layouts/dashboardLayout";

const AdminPage = () => {
  const router = useRouter();
  const { groupId } = router.query;

  if (typeof groupId !== "string") {
    return <div>Error</div>;
  }

  return <AdminArea groupId={groupId} />;
};

AdminPage.Layout = DashboardLayout;

export default AdminPage;
