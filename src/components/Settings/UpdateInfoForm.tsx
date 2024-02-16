"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormTextInput } from "common/FormInputs";
import { Button } from "common/ui";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { Title } from "common/Title";
import { updateAdminInfo } from "data-fetchers/auth";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import noIMG from "components/images/emptyIMG.webp";
import { UploadButton } from "utils/uploadthing";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

type Form = z.infer<typeof userSchema>;
type UpdateInfoFormProps = {
  close: () => void;
};

export function UpdateInfoForm({ close }: UpdateInfoFormProps) {
  const { data, update } = useSession();
  const [image, setImage] = useState<string>(data?.user?.image || "");
  const client = useQueryClient();

  const form = useForm<Form>({
    resolver: zodResolver(userSchema),
    defaultValues: userSchema.parse({
      name: data?.user?.name,
      email: data?.user?.email,
    }),
  });

  const updateUser = useMutation({
    mutationKey: ["admin"],
    mutationFn: updateAdminInfo,
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["admin"] });
      update(data);
    },
  });

  async function onSubmit(data: Form) {
    updateUser.mutate({ ...data, image });
    close();
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={
            "flex flex-col gap-y-4 md:gap-y-6 bg-white py-4 px-5 rounded-2xl"
          }
        >
          <Title>Admin info</Title>

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
              disabled
            />
            <div className={"flex gap-2"}>
              <div
                className={
                  "relative rounded-lg w-1/3 aspect-square overflow-hidden"
                }
              >
                <Image
                  className={"object-cover"}
                  fill
                  src={image || noIMG}
                  alt={"Avatar"}
                />
              </div>
              <UploadButton
                content={{
                  button({ ready, isUploading, uploadProgress }) {
                    if (!ready) return <div>Preparing...</div>;
                    if (isUploading)
                      return (
                        <div className={"relative text-center z-40"}>
                          Loading {uploadProgress}%
                        </div>
                      );
                    return "Change Avatar";
                  },
                }}
                appearance={{
                  container: "flex self-end",
                  button:
                    "focus-within:ring-transparent focus-within:bg-blue-800 focus-within:ring-offset-transparent hover:bg-blue-500 transition-colors",
                  allowedContent: "hidden",
                }}
                endpoint="avatar"
                onClientUploadComplete={(res) => {
                  setImage(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  console.log(`ERROR! ${error.message}`);
                }}
              />
            </div>

            <Button type={"submit"} fullWidth loading={updateUser.isPending}>
              Update
            </Button>
          </div>
          {updateUser.isError && (
            <div
              className={
                "text-red-500 bg-red-50 py-1 px-2 text-center font font-medium rounded-md"
              }
            >
              {updateUser.error.message}
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
