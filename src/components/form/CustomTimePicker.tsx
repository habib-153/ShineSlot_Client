import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label?: string;
};

const CustomTimePicker = ({ name, label }: TTimePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <TimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      />
    </div>
  );
};

export default CustomTimePicker;