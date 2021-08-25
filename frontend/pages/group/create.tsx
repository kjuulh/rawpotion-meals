import React from "react";
import DashboardLayout from "@components/layouts/dashboardLayout";
import { CreateGroup } from "@features/groups/create/createGroup";

const CreateGroupPage: any = () => <CreateGroup />;

CreateGroupPage.Layout = DashboardLayout;

export default CreateGroupPage;
