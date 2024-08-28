/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCheckToSlot } from "react-icons/fa6";
import { List, Button, Card } from "antd";
import { TSlot } from "../../../types/service";

const SlotList = ({ title, slots, handleSlotSelection, isSlotSelected, user }: any) => (
  <Card className="my-10">
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 text-2xl font-bold">
        <FaCheckToSlot />
        <span>{title}</span>
      </div>
      {slots && slots.length > 0 ? (
        <List
          className="mt-4"
          grid={{ gutter: 12 }}
          dataSource={slots}
          renderItem={(singleSlot: TSlot) => (
            <List.Item>
              <Button
                type={isSlotSelected(singleSlot) ? "primary" : "default"}
                onClick={() => handleSlotSelection(singleSlot)}
                disabled={singleSlot?.isBooked !== "available" || user?.role === "admin"}
              >
                {`${singleSlot?.startTime}-${singleSlot?.endTime}`}
              </Button>
            </List.Item>
          )}
        />
      ) : (
        <div className="text-2xl md:text-3xl text-center font-semibold mt-10">
          Sorry, no slots are available
        </div>
      )}
    </div>
  </Card>
);

export default SlotList;