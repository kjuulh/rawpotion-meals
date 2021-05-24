import AdminArea from "../../../src/lib/features/admin/adminArea";
import { useRouter } from "next/router";

const AdminPage = () => {
  const router = useRouter();
  const { groupId } = router.query;

  if (typeof groupId !== "string") {
    return <div>Error</div>;
  }

  return <AdminArea groupId={groupId} />;
};

export default AdminPage;
