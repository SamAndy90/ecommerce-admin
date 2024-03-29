"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextInput } from "common/FormInputs";
import { FormPasswordInput } from "common/FormInputs/FormPasswordInput";
import { Button } from "common/ui";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { getDefaults } from "utils/zod";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Email is required").default(""),
  password: z.string().min(1, "Password is required").default(""),
});

type Form = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<Form>({
    resolver: zodResolver(loginSchema),
    defaultValues: getDefaults(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = form;

  async function onSubmit(data: Form) {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.error) {
      setError("root", {
        type: "random",
        message: res.error,
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full max-w-screen-xs"}
      >
        <div
          className={
            "flex flex-col gap-y-4 md:gap-y-6 bg-white py-4 px-5 rounded-2xl"
          }
        >
          <div className={"flex flex-col gap-y-1"}>
            <h2 className={"text-center text-3xl font-medium md:text-4xl"}>
              Login
            </h2>
            <p className={"text-center text-gray-500"}>
              Login to your admin account
            </p>
            <p className={"text-sm text-red-800 text-center"}>
              admin@example.com: admin123
            </p>
          </div>

          <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
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
              Login
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
