"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormTextInput } from "common/FormInputs";
import { FormPasswordInput } from "common/FormInputs/FormPasswordInput";
import { Button, LinkButton } from "common/ui";
import { createUser } from "data-fetchers/auth";
import { UserType } from "models/User";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { getDefaults } from "utils/zod";
import z from "zod";
import { AuthType } from "./AuthWrapper";
import { AxiosError } from "axios";

const registerSchema = z.object({
  email: z.string().email().default(""),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .default(""),
  name: z.string().default(""),
  lastName: z.string().default(""),
});

type Form = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  changeAuthState: (v: AuthType) => void;
};

export default function RegisterForm({ changeAuthState }: RegisterFormProps) {
  const form = useForm<Form>({
    resolver: zodResolver(registerSchema),
    defaultValues: getDefaults(registerSchema),
  });

  const createNewUser = useMutation({
    mutationFn: (data: UserType) => createUser(data),
    onError: (err) => {
      if (err instanceof AxiosError) err.message = err.response?.data;
      form.setError("email", err);
    },
  });

  function onSubmit(data: Form) {
    createNewUser.mutate(data);
    // form.reset(getDefaults(registerSchema));
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={
            "flex flex-col gap-y-8 md:gap-y-12 bg-white p-5 rounded-2xl"
          }
        >
          <div className={"flex flex-col gap-y-2"}>
            <h2 className={"text-center text-3xl font-semibold md:text-4xl"}>
              Create an account!
            </h2>
            <p className={"text-center text-gray-500"}>
              Register for an account
            </p>
          </div>

          <div className={"flex flex-col gap-y-6 md:gap-y-8"}>
            <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
              <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
                <FormTextInput<Form>
                  fieldName={"name"}
                  label={"First name"}
                  className={{ label: "text-blue-700" }}
                />
                <FormTextInput<Form>
                  fieldName={"lastName"}
                  label={"Last name"}
                  className={{ label: "text-blue-700" }}
                />
              </div>
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
              {/* 
              <DataFetcherErrorAlert
                isError={login.isError || registration.isError}
                error={login.error || registration.error}
              /> */}
            </div>

            <div className={"flex flex-col gap-y-3"}>
              <Button
                type={"submit"}
                fullWidth
                loading={createNewUser.isPending}
              >
                Create account
              </Button>

              <div
                className={"flex flex-wrap items-center justify-center gap-x-3"}
              >
                <p className={"text-sm text-gray-500"}>
                  Already have an account?
                </p>
                <LinkButton
                  className={{
                    button: "font-medium",
                  }}
                  size={"small"}
                  onClick={() => changeAuthState("login")}
                >
                  Login
                </LinkButton>
              </div>
            </div>
          </div>

          {/* <SocialLogin /> */}
          <LinkButton
            colorVariant={"secondary"}
            onClick={() => signIn("google", { redirect: false })}
          >
            Sign in with Google
          </LinkButton>
        </div>
      </form>
    </FormProvider>
  );
}
