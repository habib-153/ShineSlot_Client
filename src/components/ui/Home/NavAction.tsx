import { Link } from "react-router-dom";
import { Dropdown, Menu, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import CustomButton2 from "../Buttons/CustomButton2";

const NavAction = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Logged In as <br /> <strong>{user?.email}</strong>
      </Menu.Item>
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      ) : (
        <>
          <div className="hidden md:block">
            <Link to="/signUp">
              <CustomButton2
                text="Start For Free"
                bgColor="#FFFFFF"
                textColor="#111111"
              />
            </Link>
          </div>
          <Link to="/login">
            <CustomButton2 text="Login" textColor="#FFFFFF" />
          </Link>
        </>
      )}
    </div>
  );
};

export default NavAction;
