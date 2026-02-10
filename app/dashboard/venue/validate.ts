import { VenusType } from "@/server/db";
import { venusValidationConfig } from "@/server/db/models/venus.config";
import * as yup from "yup";

export const schemeValidate = async (
  data: Pick<VenusType, "name" | "address" | "stateId">,
) => {
  const schema = yup.object({
    name: yup
      .string()
      .required(venusValidationConfig.name.errorMessages.required)
      .min(
        venusValidationConfig.name.minLength,
        venusValidationConfig.name.errorMessages.minLength,
      )
      .max(
        venusValidationConfig.name.maxLength,
        venusValidationConfig.name.errorMessages.maxLength,
      ),
    address: yup
      .string()
      .required(venusValidationConfig.address.errorMessages.required)
      .min(
        venusValidationConfig.address.minLength,
        venusValidationConfig.address.errorMessages.minLength,
      )
      .max(
        venusValidationConfig.address.maxLength,
        venusValidationConfig.address.errorMessages.maxLength,
      ),
    stateId: yup
      .string()
      .required(venusValidationConfig.stateId.errorMessages.required),
  });

  try {
    await schema.validate(data, { abortEarly: false });

    return { success: true };
  } catch (error) {
    let errors: string = "";
    if (error instanceof yup.ValidationError) {
      errors = error.inner.reduce((acc, err) => {
        acc += err.message + "\n";
        return acc;
      }, "");
    }
    return { success: false, message: errors };
  }
};
