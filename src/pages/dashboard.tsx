import React, { use, useEffect } from "react";
import * as XLSX from "xlsx"
import { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import generateBrowserFingerprint from "@/util/GenerateFingerprint";
import { getSocket, connectSocket } from "@/util/Socket";
import axios from 'axios';
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];


import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Upload,
  message
} from "antd";

const Dashboard = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const { user, ready, setUser, token, refreshToken } = useContext(UserContext);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!ready) return;
    if (ready && !user) {
      router.push("/login");
    }
  }, [user]);
  let userId: string;
  if (user) {
    userId = user.id;
  }

  let socket = getSocket();
  // if (!socket) {
  //   socket = connectSocket(token, refreshToken);
  // }

  console.log("user: ", user, ready, redirect);

  let fingerPrint = "";

  generateBrowserFingerprint()
    .then((result) => {
      fingerPrint = result;
    })
    .catch((error) => {
      console.error("Error:Genertating FingerPrint ", error);
    });

    //onchange state
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setExcelFile(e.target.result);
      };
    } else {
      setExcelFile(null);
      console.log("Please select a file first");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      try {
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const workSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data.slice(0, 10));
        
      } catch (error) {
        console.error("Error reading or parsing the file:", error);
      }
    }
  };

  const handleRunModel = async (event) => {
    event.preventDefault();
    console.log('Running Model', excelData);
    try {
      const formData = new FormData();
      formData.append('file', excelFile); // Append the file to FormData
      console.log('lunhu', formData)

      const response = await axios.post('/uploadfile/excel', excelData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
const [fileList, setFileList] = useState<UploadFile[]>([]);
const [uploading, setUploading] = useState(false);

const handleUpload = async () => {
  const formData = new FormData();
  console.log(fileList)
  // fileList.forEach((file) => {
    formData.append("file", fileList[0] as FileType);
  // });
  setUploading(true);
  try {
    const response = await axios.post("/uploadfile/excel", formData);
    setFileList([]);
    message.success("upload successfully.");
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error:", error);
    message.error("upload failed.");
  } finally {
    setUploading(false);
  }
  
};

const props: UploadProps = {
  onRemove: (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  },
  beforeUpload: (file) => {
    const isXLSOrCsv = file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isCsv = file.type === "text/csv";
    if (!isXLSOrCsv && !isCsv) {
      message.error("You can only upload excel or csv file!");
    }
    else{
      setFileList([...fileList, file]);
    }
    return false;
  },
  fileList,
};




  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl font-bold mb-6">Upload Tool's Data</h1>
        {/* <p className="text-gray-500">Upload</p> */}
        <form
          className="flex flex-col mt-2 rounded-2xl w-fit mx-auto border px-10 py-5 bg-gray-100"
          onSubmit={handleFileSubmit}
        >
          <label
            htmlFor="fileInput"
            className="flex items-center bg-white px-2 rounded-2xl h-12 border shadow-lg"
          >
            <input
              type="file"
              id="fileInput"
              className="form-control"
              required
              onChange={handleFile}
            />
            {/* {excelFile && <span className="ml-2">{excelFile.name}</span>} */}
          </label>
          <div className="justify-between border gap-2 rounded-full w-full sm:flex">
            <button type="submit" className="primary mt-5 hover:shadow-2xl">
              Upload
            </button>
          </div>
        </form>
        <div>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16, backgroundColor: "#3b82f6" , color: "white"}}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </div>
        <div className="viewer">
          {excelData ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((individualExcelData, index) => (
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No file uploaded</div>
          )}
        </div>
      </div>
      {excelData ? (
        <div className="justify-between border gap-2 rounded-full w-full sm:flex">
          <button
            className="primary mt-5 hover:shadow-2xl"
            onClick={handleRunModel}
          >
            Run Model
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="sm:p-10 mt-4 ">
        {loading && <p>Loading...</p>}
        {results.length > 0 && !loading ? (
          <div className="w-full flex flex-col">
            <h1 className="text-[30px] max-sm:text-center">Results</h1>
            <div className="gap-2 flex flex-col  w-full">
              {results.map((result: any, index: number) => (
                <div
                  key={index}
                  className="border-2 hover:scale-105 transition duration-200 rounded-xl p-2"
                >
                  <div className="flex item-center gap-4 pb-2 border-b  ">
                    <div className="sm:w-11 sm:h-11 w-8 h-8 rounded-lg item-center justify-between">
                      <img
                        src={result.img}
                        alt={result.title}
                        width={100}
                        height={100}
                        className="sm:w-11 sm:h-11 w-8 h-8"
                      />
                    </div>
                    <div className="flex flex-col w-full overflow-hidden">
                      <a
                        href={result.link}
                        className="sm:text-xl text-base text-blue-900 w-full font-bold "
                      >
                        {result.title}
                      </a>
                      <a
                        href={result.link}
                        className="text-blue-600 text-sm w-full"
                      >
                        {result.link}
                      </a>
                    </div>
                  </div>
                  <p className="text-gray-600 ">{result.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {results.length === 0 && !loading && (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
