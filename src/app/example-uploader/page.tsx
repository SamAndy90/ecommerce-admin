"use client";

import { UploadButton, UploadDropzone, Uploader } from "utils/uploadthing";
import { FiUpload } from "react-icons/fi";

export default function UploadExample() {
  return (
    <form
      encType={"multipart/form-data"}
      className="flex min-h-screen flex-col items-center justify-between p-4"
    >
      <UploadButton
        content={{
          button({ ready, isUploading, uploadProgress }) {
            if (!ready) return <div className={"relative z-50"}>Wait...</div>;
            if (isUploading)
              return (
                <div className={"relative z-50"}>Loading {uploadProgress}%</div>
              );
            return <div>Ready</div>;
          },
        }}
        appearance={{
          container: "flex h-32 w-32",
          button:
            "h-full w-full focus-within:ring-transparent focus-within:bg-blue-800 focus-within:ring-offset-transparent hover:bg-blue-500 transition-colors",
          allowedContent: "hidden",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </form>
  );
}
