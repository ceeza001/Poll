import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui";
import { convertFileToUrl } from "@/lib/utils";
import { Loader } from "@/components/shared";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  type: string;
};

const FileUploader = ({ fieldChange, mediaUrl, type }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const acceptTypes = {
    "image/*": [".png", ".jpeg", ".jpg"],
  };

  if (type === "all-file") {
    acceptTypes["video/*"] = [".mp4", ".mov"]; // Add video types
    acceptTypes["application/pdf"] = [".pdf"]; // Add PDF type
    acceptTypes["application/msword"] = [".doc", ".docx"]; // Add document types
  }

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
    accept: acceptTypes,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full flex flex-center flex-col bg-transparent rounded-xl border border-border cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center py-2 w-full aspect-video">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-dim my-2">
            Drag {type === "all-file" ? "files" : "photo"} here
          </h3>
          
          <p className="text-dim small-regular my-2">SVG, PNG, JPG, {type === "all-file" && ("MP4, MOV, PDF, DOC, DOCX")}</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
