import { Input } from "@material-tailwind/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id?: string;
  label?: string;
  type: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  defaultValue?: string;
  readonly?: boolean;
}

export const InputV2: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  register,
  required,
  defaultValue,
  readonly,
}) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <Input readOnly={readonly}
      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} id={id}
      placeholder={label ? `Enter Product ${label}` : ''}
      type={type}
      {...register}
      className="w-full px-3 py-2 border rounded"
      required={required}
      label={label}
      defaultValue={defaultValue}    />
  </div>
);