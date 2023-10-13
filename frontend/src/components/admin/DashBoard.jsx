/* eslint-disable react/prop-types */
import Sidebar from "../../components/admin/Sidebar";

export const DashBoard = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};
