import { Layout, Menu } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemGenerator";
import { adminPaths } from "../../../routes/adminRoutes";
import { userPaths } from "../../../routes/userRoutes";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <h1 className="font-semibold">Shine Slot</h1>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
