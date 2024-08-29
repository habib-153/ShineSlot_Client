import { useState } from "react";
import { TQueryParams, TUser } from "../../types/global";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { toast } from "sonner";

export type TTableData = Pick<TUser, "name" | "email" | "phone">;

const UserManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [updateUser] = useUpdateUserMutation();
  const {
    data: userData,
    //isLoading,
    isFetching,
  } = useGetAllUsersQuery([
    { name: "page", value: page },
    { name: "sort", value: "createAt" },
    ...params,
  ]);

  // console.log(userData)
  const metaData = userData?.meta;
  // console.log(metaData);

  const handleUpdateRole = async (id: string, role: string) => {
    const toastId = toast.loading("Please wait...");

    const payload = {
      role: role,
    };
    const res = await updateUser({ id, payload });
    if (res?.error) {
      toast.error("something went wrong", { id: toastId });
    } else {
      toast.success("User role updated successfully", { id: toastId });
    }
  };
  const tableData = userData?.data?.map(
    ({ _id, name, email, phone, role }) => ({
      key: _id,
      name,
      email,
      phone,
      role,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        
        return (
          <Space>
            {item.role === "admin" ? (
              <Button danger onClick={() => handleUpdateRole(item.key, "user")}>
                Remove Admin
              </Button>
            ) : (
              <Button onClick={() => handleUpdateRole(item.key, "admin")}>
                Make Admin
              </Button>
            )}
            <Button>Delete</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "role", value: item })
      );

      setParams(queryParams);
    }
  };
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default UserManagement;
