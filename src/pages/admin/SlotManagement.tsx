import { Button, Dropdown, Table, TableColumnsType, TableProps, Tag } from "antd";
import { TSlot } from "../../types/service";
import { useState } from "react";
import { TError, TQueryParams } from "../../types/global";
import { useGetAllSlotsForAdminQuery, useUpdateSlotStatusMutation } from "../../redux/features/slot/slotApi";
import CreateSlotModal from "../../components/ui/Dashboard/admin/CreateSlotModal";
import { toast } from "sonner";

export type TTableData = Pick<
  TSlot,
  "service" | "startTime" | "endTime" | "date" | "isBooked"
>;
const SlotManagement = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const [slotId, setSlotId] = useState('');
  const [updateSlotStatus] = useUpdateSlotStatusMutation()

  const { data: slotsData, isFetching } = useGetAllSlotsForAdminQuery(params);

  const uniqueServices = Array.from(
    new Set(slotsData?.data?.map((slot: TSlot) => slot?.service?.name))
  ).map((name) => {
    const service = slotsData?.data?.find(
      (slot: TSlot) => slot?.service?.name === name
    )?.service;
    return {
      text: service?.name || "",
      value: service?._id || "",
    };
  });

  const uniqueDate = Array.from(
    new Set(slotsData?.data?.map((slot: TSlot) => slot?.date))
  ).map((date) => {
    //const service = slotsData?.data?.find((slot: TSlot) => slot?.date === date)?.service;
    return {
      text: date || "",
      value: date || "",
    };
  });

  const items = [
    {
      label: 'Available',
      key: 'available',
    },
    {
      label: 'Booked',
      key: 'booked',
    },
    {
      label: 'Cancelled',
      key: 'cancelled',
    },
  ];

  const tableData: TTableData[] = slotsData?.data?.map(
    ({ _id, service, date, startTime, endTime, isBooked }) => ({
      key: _id,
      service, // Add the 'service' property
      name: service?.name,
      date,
      startTime,
      endTime,
      isBooked,
    })
  ) || [];

  const handleStatusUpdate = async(data: { key: string; }) => {
    const payload = {
      id: slotId,
      data: {
        isBooked: data.key,
      },
    };

    const res = await updateSlotStatus(payload)
    if(res?.error) {
      toast.error((res?.error as TError)?.data.message);
    }
    else{
      toast.success(res.data?.message);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Service Name",
      key: "name",
      dataIndex: "name",
      filters: uniqueServices,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      filters: uniqueDate,
    },
    {
      title: "Status",
      key: "isBooked",
      dataIndex: "isBooked",
      render: (item) => {
        let color;
        if (item === "available") {
          color = "blue";
        }
        if (item === "booked") {
          color = "green";
        }
        if (item === "cancelled") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSlotId(item.key)}>Update</Button>
          </Dropdown>
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

      filters.name?.forEach((item) =>
        queryParams.push({ name: "serviceId", value: item })
      );

      filters.date?.forEach((item) =>
        queryParams.push({ name: "date", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div>
      <CreateSlotModal />
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

export default SlotManagement;
