import * as yup from "yup";

export const userValidationSchema = yup.object({
    name: yup.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters").required("Name is required"),
});
