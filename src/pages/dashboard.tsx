import React, { use, useEffect } from "react";
import * as XLSX from "xlsx"
import { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import generateBrowserFingerprint from "@/util/GenerateFingerprint";
import { getSocket, connectSocket } from "@/util/Socket";
import axios from 'axios';
import type { GetProp, UploadFile, UploadProps} from "antd";
import { Card, Col, Row } from 'antd';
// import "../styles/globals.css"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];


import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Upload,
  message
} from "antd";

const { Dragger } = Upload;

const Dashboard = () => {
  const router = useRouter();
  // const [query, setQuery] = useState("");
  const [results, setResults] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser, token, refreshToken } = useContext(UserContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [rulPredicted,setRulPredicted]=useState();

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

  // console.log("user: ", user, ready, redirect);

  let fingerPrint = "";

  generateBrowserFingerprint()
    .then((result) => {
      fingerPrint = result;
    })
    .catch((error) => {
      console.error("Error:Genertating FingerPrint ", error);
    });

    //onchange state

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
    console.log(response)
    setRulPredicted(response.data.dataa);
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
      setFileList([file]);
    }
    return false;
  },
  fileList,
};

// useEffect(() => {
//   if (fileList[0]) {
//     const selectedFile = fileList[0];
//     console.log(selectedFile, "rgrhrwrgwegwegwr");
//     if (selectedFile) {
//       let reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const workbook = XLSX.read(e.target.result, { type: "array" });
//           const workSheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[workSheetName];
//           const range = XLSX.utils.decode_range(worksheet["!ref"]);
//           const firstTenRows = [];
//           for (
//             let rowNum = range.s.r;
//             rowNum <= Math.min(10, range.e.r);
//             rowNum++
//           ) {
//             const row = [];
//             for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
//               const cellAddress = { c: colNum, r: rowNum };
//               const cellRef = XLSX.utils.encode_cell(cellAddress);
//               const cellValue = worksheet[cellRef]
//                 ? worksheet[cellRef].v
//                 : null;
//               row.push(cellValue);
//             }
//             firstTenRows.push(row);
//           }
//           setExcelData(firstTenRows);
//           console.log(firstTenRows, "excelData");
//         } catch (error) {
//           console.error("Error reading or parsing the file:", error);
//         }
//       };
//       reader.readAsArrayBuffer(selectedFile);
//     }
//   }
// }, [fileList]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl font-bold mb-6">Upload Tool's Data</h1>
        {/* <p className="text-gray-500">Upload</p> */}
        {/* <form
          className="flex flex-col mt-2 rounded-2xl w-fit mx-auto border px-10 py-5 bg-gray-100"
          onSubmit={handleFileSubmit}
        >
          <label
            htmlFor="fileInp999999999ut"
            className="flex items-center bg-white px-2 rounded-2xl h-12 border shadow-lg"
          >
            <input
              type="file"
              id="fileInput"
              className="form-control"
              required
              onChange={handleFile}
            />
          </label>
          <div className="justify-between border gap-2 rounded-full w-full sm:flex">
            <button type="submit" className="primary mt-5 hover:shadow-2xl">
              Upload
            </button>
          </div>
        </form> */}
        <div>
          <Dragger {...props} maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support Excel file or CSV file only. Please follow instruction
              page for more details.
            </p>
          </Dragger>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={ fileList.length === 0 ? 
              { marginTop: 16, backgroundColor: "#0000000a", borderColor: "#d9d9d9", color: "#00000040" }
              : { backgroundColor: "#3b82f6", color: "white"}
            }
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </div>
        <div className="viewer">
          {/* {excelData ? (
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
          )} */}
        </div>
      </div>
      {/* {excelData ? (
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
      )} */}

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
       


       {(rulPredicted || uploading )&& <div className="prediction-table">
          <Row gutter={16}>
              <Col span={16}>
                <Card title="RUL Value" bordered={false} loading={uploading}>
                  {rulPredicted}
                </Card>
              </Col>
          </Row>
        </div>}
      </div>
    </>
  );
};

export default Dashboard;
