import { Button } from "@material-tailwind/react";

type CustomButtonProps = {
  text: string;
  bgColor?: string;
  textColor: string;
}

const CustomButton2 = ({ text , bgColor, textColor }: CustomButtonProps) => {
  return (
    <Button
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      placeholder=""
      variant={!bgColor ? "outlined" : undefined}
      style={bgColor
        ? { backgroundColor: bgColor, color: textColor }
        : { color: textColor, border: `1px solid ${textColor}` }}
      className="font-normal text-base py-2 px-4 rounded-lg normal-case hover:shadow-md" >
      {text}
    </Button>
  );
};

export default CustomButton2;