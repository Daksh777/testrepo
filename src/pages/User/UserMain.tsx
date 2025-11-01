import UserPass from "@/components/User/UserPass";
import UserProfile from "@/components/User/UserProfile";
import UserUpgrade from "@/components/User/UserUpgrade";
import { Route, Routes } from "react-router";
import UserOrderMain from "./UserOrders/UserOrderMain";
import UserEdit from "@/components/User/UserEdit";

const UserMain = () => {
  return (
    <div>
      <Routes>
        <Route path="/profile/edit" element={<UserEdit />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/orders" element={<UserOrderMain />} />
        <Route path="/pass/upgrade" element={<UserUpgrade />} />
        <Route path="/pass" element={<UserPass />} />
      </Routes>
    </div>
  );
};

export default UserMain;
