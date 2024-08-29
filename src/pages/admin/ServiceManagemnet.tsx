import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { TService } from "../../types/service";
import { useState } from "react";
import { TQueryParams } from "../../types/global";
import {
  useDeleteServiceMutation,
  useGetAllServicesForAdminQuery,
} from "../../redux/features/service/serviceApi";
import { handleDeleteService } from "../../utils/handleDeleteService";
import UpdateService from "../../components/ui/Dashboard/admin/UpdateService";
import CreateService from "../../components/ui/Dashboard/admin/CreateService";

export type TTableData = Pick<
  TService,
  "_id" | "name" | "description" | "duration" | "price"
>;
const ServiceManagement = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: serviceData, isFetching } =
    useGetAllServicesForAdminQuery(params);
  const [deleteService] = useDeleteServiceMutation();
  
  const tableData: TTableData[] =
    serviceData?.data?.map(({ _id, name, description, duration, price }) => ({
      _id,
      key: _id,
      name,
      description,
      duration,
      price,
    })) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Service Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (price: number) => `${price.toFixed(2)} BDT`,
      filters: [
        { text: "High to Low", value: "-price" },
        { text: "Low to High", value: "price" },
      ],
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (duration: number) => `${duration} min`,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log(item)
        return (
          <Space>
            <UpdateService item={item} />
            <Button
              danger
              onClick={() => handleDeleteService(item._id, deleteService)}
            >
              Delete
            </Button>
          </Space>
        );
      },
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

      filters.price?.forEach((item) =>
        queryParams.push({ name: "sort", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <div>
      <CreateService />
      <div className="mt-4">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ServiceManagement;
