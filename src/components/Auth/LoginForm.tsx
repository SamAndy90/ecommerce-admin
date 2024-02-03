"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextInput } from "common/FormInputs";
import { FormPasswordInput } from "common/FormInputs/FormPasswordInput";
import { Button, LinkButton } from "common/ui";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { getDefaults } from "utils/zod";
import z from "zod";
import { AuthType } from "./AuthWrapper";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email().default(""),
  password: z.string().min(1, "Password is required").default(""),
});

type Form = z.infer<typeof loginSchema>;

type LoginFormProps = {
  changeAuthState: (v: AuthType) => void;
};
export default function LoginForm({ changeAuthState }: LoginFormProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const form = useForm<Form>({
    resolver: zodResolver(loginSchema),
    defaultValues: getDefaults(loginSchema),
  });

  async function onSubmit(data: Form) {
    setIsChecking(true);
    setIsError(false);
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.status === 401) {
      setIsError(true);
    }
    setIsChecking(false);
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
              Login
            </h2>
            <p className={"text-center text-gray-500"}>Login to your account</p>
          </div>

          <div className={"flex flex-col gap-y-6 md:gap-y-8"}>
            <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
              <FormTextInput<Form>
                fieldName={"email"}
                label={"Email"}
                className={{ label: "text-blue-700" }}
              />

              <div className={"flex flex-col gap-y-2"}>
                <FormPasswordInput<Form>
                  fieldName={"password"}
                  label={"Password"}
                  className={{ label: "text-blue-700" }}
                />

                {/* <div className={"flex flex-col items-end"}>
                  <LinkButton
                    colorVariant={"secondary"}
                    size={"small"}
                    // onClick={() => setAuthTabType(AuthTabType.PASSWORD_RESET)}
                  >
                    Forgot Password?
                  </LinkButton>
                </div> */}
              </div>

              {/* <DataFetcherErrorAlert
                error={login.error}
                isError={login.isError}
              /> */}
              {isError && (
                <div className={"text-red-500"}>
                  User not found. Please Register
                </div>
              )}
            </div>

            <div className={"flex flex-col gap-y-3"}>
              <Button type={"submit"} fullWidth loading={isChecking}>
                Login
              </Button>

              <div
                className={"flex flex-wrap items-center justify-center gap-x-1"}
              >
                <p className={"text-sm text-gray-500"}>
                  Don’t have an account yet?
                </p>
                <LinkButton
                  className={{
                    button: "font-medium",
                  }}
                  size={"small"}
                  onClick={() => changeAuthState("registration")}
                >
                  Sign Up
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
