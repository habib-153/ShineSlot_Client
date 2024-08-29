import { z } from "zod";
import { vehicleType } from "../constant";

export const createVehicleValidationSchema = z.object({
    vehicleType: z.enum([...vehicleType] as [string, ...string[]], {required_error: 'Please Select a valid vehicle type'}),
    vehicleModel: z.string({required_error: 'Please Provide a valid vehicle model'}),
    vehicleBrand: z.string({required_error: 'Please Provide a valid vehicle brand'}),
    manufacturingYear: z.string({required_error: 'Please provide a year'}).max(new Date().getFullYear()),
    registrationPlate: z.string({required_error: 'Please Provide a registration plate'}),
})

export const createSlotValidationSchema = z.object({
    service: z.string({required_error: 'Please Select a service'}),
    date: z.any({required_error: 'Please Select a date'}),
    startTime: z.any({required_error: 'Please Select a start time'}),
    endTime: z.any({required_error: 'Please Select a end time'}),
})