import { z } from "zod";
import { vehicleType } from "../constant";


export const createVehicleValidationSchema = z.object({
    vehicleType: z.enum([...vehicleType] as [string, ...string[]], {required_error: 'Please Select a valid vehicle type'}),
    vehicleModel: z.string({required_error: 'Please Provide a valid vehicle model'}),
    vehicleBrand: z.string({required_error: 'Please Provide a valid vehicle brand'}),
    manufacturingYear: z.string({required_error: 'Please provide a year'}).max(new Date().getFullYear()),
    registrationPlate: z.string({required_error: 'Please Provide a registration plate'}),
})