import { Navigate, Route, Routes } from "react-router";
import AdminProtectedRoute from "../../layouts/AdminProtectedRoute";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminDashboradMain from "@/components/Admin/AdminDashboard/AdminDashboradMain";
import AdminUsers from "@/components/Admin/AdminUsers/AdminUsers";
import SingleUser from "@/components/Admin/SingleUser/SingleUser";
import Reports from "@/components/Admin/Reports/Reports";
import ShowTransactions from "@/components/Admin/Transactions/ShowTransactions";
import ShowAllPasses from "@/components/Admin/Passe/ShowAllPasses";
import AddEditPasse from "@/components/Admin/Passe/AddEditPasse";
import AssignPass from "@/components/Admin/Passe/AssignPass";
import DatabaseMain from "@/components/Admin/Database/DatabaseMain";
import LogsMain from "@/components/Admin/Logs/LogsMain";
import AdminReport from "@/components/Admin/AdminReport/AdminReport";

const AdminMain = () => {
  return (
    <Routes>
      <Route element={<AdminProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboradMain />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/transactions" element={<ShowTransactions />} />
        <Route path="/passes/new" element={<AddEditPasse />} />
        <Route path="/passes/assign" element={<AssignPass />} />
        <Route path="/passes" element={<ShowAllPasses />} />
        <Route path="/database" element={<DatabaseMain />} />
        <Route path="/logs" element={<LogsMain />} />
        <Route path="/admin-report" element={<AdminReport />} />
      </Route>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminMain;
