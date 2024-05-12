import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import Button from "../Button";
import UploadList from "./UploadList";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string;
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[];
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: File) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: File) => void;
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: File) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: File) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: File) => void;
  /**设置上传的请求头部 */
  headers?: { [key: string]: any };
  /**上传的文件字段名 */
  name?: string;
  /**上传时附带的额外参数 */
  data?: { [key: string]: any };
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽上传 */
  drag?: boolean;
  children?: React.ReactNode;
}

export const Upload: FC<UploadProps> = ({
  action,
  defaultFileList,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove,
  headers,
  name,
  data,
  withCredentials,
  accept,
  multiple,
  drag,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((prevfile) => {
        if (updateFile.uid === prevfile.uid) {
          return { ...prevfile, ...updateObj };
        } else {
          return prevfile;
        }
      });
    });
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFilecChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => {
        return item.uid !== file.uid;
      });
    });
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const tt: number = e.total as number;
          let percentage = Math.round((e.loaded * 100) / tt) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });

            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: "success", response: resp.data });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: "error", error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  console.log("filelist", fileList);

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile: File) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  return (
    <div className="upload-component">
      <Button btnType="primary" onClick={() => handleClick()}>
        上传
      </Button>
      <input type="file" ref={inputRef} className="file-input" onChange={(e) => handleFilecChange(e)} style={{ display: "none " }} />
      <UploadList
        fileList={fileList}
        onRemove={(file) => {
          handleRemove(file);
        }}></UploadList>
    </div>
  );
};
export default Upload;
