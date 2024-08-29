import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const CustomInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: {error} }) => (
          <Form.Item label={label}>
            <Input disabled={disabled}  {...field} type={type} id={name} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;