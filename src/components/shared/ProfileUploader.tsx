import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()} className="w-fit mx-auto">
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="border border-border bg-[#010101] mx-auto cursor-pointer flex-center gap-4 relative h-[7rem] w-[7rem] rounded-full overflow-hidden">
        {fileUrl && (
          <img
            src={fileUrl}
            className="object-cover object-top"
          />
        )}

        <div className=" absolute bottom-0 glassmorphism opacity-10 hover:opacity-70 w-full h-full flex-center flex-col">
          <img
            src="/assets/icons/camera.svg"
            alt="upload"
            className="h-12 w-12"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileUploader;