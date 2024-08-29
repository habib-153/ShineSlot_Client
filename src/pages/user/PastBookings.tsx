/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetMyBookingsQuery } from "../../redux/features/bookings/bookingsApi";
import { TBooking } from "../../types/service";
import { isBefore, parseISO } from "date-fns";

type TTableData = Pick<
  TBooking,
  | "customer"
  | "serviceId"
  | "slotId"
  | "_id"
  | "transactionId"
  | "paymentStatus"
  | "price"
>;

const PastBookings = () => {
  const { data: myBookings, isFetching } = useGetMyBookingsQuery(undefined);

  const pastBookings = myBookings?.filter((item: TBooking) => {
    const slotDate = parseISO(item?.slotId?.date + "T" + item?.slotId?.endTime);
    return isBefore(slotDate, new Date());
  });
  const tableData: TTableData[] =
    pastBookings?.map(({ _id, serviceId, slotId }: TBooking) => ({
      key: _id,
      serviceName: serviceId?.name,
      price: serviceId?.price,
      date: slotId?.date,
      startTime: slotId?.startTime,
      endTime: slotId?.endTime,
    })) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Service Name",
      key: "serviceName",
      dataIndex: "serviceName",
    },
    {
      title: "Bill",
      key: "price",
      dataIndex: "price",
      render: (price: number) => `${price.toFixed(2)} BDT`,
    },
    {
      title: "Time",
      key: "time",
      render: (item) => `${item.startTime} - ${item.endTime}`,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log(item)
        return <Button>Details</Button>;
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _sorter
  ) => {};

  return (
    <div className="mt-4">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default PastBookings;
