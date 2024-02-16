"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextInput } from "common/FormInputs";
import { FormPasswordInput } from "common/FormInputs/FormPasswordInput";
import { Button } from "common/ui";
import { FormProvider, useForm } from "react-hook-form";
import { getDefaults } from "utils/zod";
import z from "zod";
import { Title } from "common/Title";
import { createAdmin } from "data-fetchers/auth";
import { AxiosError } from "axios";

const adminSchema = z.object({
  email: z.string().email("Email is required").default(""),
  password: z.string().min(5, "Password is required").default(""),
  name: z.string().default(""),
});

type Form = z.infer<typeof adminSchema>;
type AdminFormProps = {
  close: () => void;
};

export function AdminForm({ close }: AdminFormProps) {
  const form = useForm<Form>({
    resolver: zodResolver(adminSchema),
    defaultValues: getDefaults(adminSchema),
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isLoading },
  } = form;

  async function onSubmit(data: Form) {
    try {
      await createAdmin(data);
      reset();
      close();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("root", {
          type: "random",
          message: error.response?.data.error || error.message,
        });
        setError("email", {}, { shouldFocus: true });
      }
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            "flex flex-col gap-y-4 md:gap-y-6 bg-white py-4 px-5 rounded-2xl"
          }
        >
          <Title>Create new Admin</Title>

          <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
            <FormTextInput<Form>
              fieldName={"name"}
              label={"Fullname"}
              className={{ label: "text-blue-700" }}
            />
            <FormTextInput<Form>
              fieldName={"email"}
              label={"Email"}
              className={{ label: "text-blue-700" }}
            />

            <FormPasswordInput<Form>
              fieldName={"password"}
              label={"Password"}
              className={{ label: "text-blue-700" }}
            />
            <Button type={"submit"} fullWidth loading={isLoading}>
              Add
            </Button>
          </div>
          {errors.root && (
            <div
              className={
                "text-red-500 bg-red-50 py-1 px-2 text-center font font-medium rounded-md"
              }
            >
              {errors.root?.message}
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
