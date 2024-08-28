export type TRole = "admin" | "user";

export const Role: TRole[] = ["admin", "user"];

export const vehicleType = [
  "car",
  "truck",
  "SUV",
  "van",
  "motorcycle",
  "bus",
  "electricVehicle",
  "hybridVehicle",
  "bicycle",
  "tractor",
];

export type TVehicleTypes =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motorcycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";

export const vehicleTypeOptions = vehicleType.map((item) => ({
  value: item,
  label: item.toUpperCase(),
}));
