import { Button, Layout } from "antd";
import { logout } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

const DashboardLayout = () => {
    const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>{' '}
        </Header>
        <Content style={{ margin: '10px 10px 0' }}>
          <div
            style={{
              padding: 10,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;