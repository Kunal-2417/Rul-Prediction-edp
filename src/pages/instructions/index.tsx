import React from "react";
import { Collapse } from "antd";
// import './instruction.css'; 
const { Panel } = Collapse;

const HistoryPage = () => {
  const items = [
    {
      key: '1',
      label: 'Data Format',
      text: [
        "Save the data in CSV (Comma-Separated Values) format.",
        "Each row represents a single sample, and each column represents a feature or attribute.",
        "Ensure that the CSV file contains a header row with column names."
      ],
    },
    {
      key: '2',
      label: 'Sampling Frequency',
      text: [
        "Specify the sampling frequency of the data to be at least 300 Hz.",
        "Include this information either in the header row of the CSV file or in the accompanying documentation."
      ],
    },
    {
      key: '3',
      label: 'Duration of Data',
      text: [
        "Upload at least one minute of data.",
        "Ensure that the data spans a duration of one minute or more, depending on the sampling frequency."
      ],
    },
    {
      key: '4',
      label: 'Data Preprocessing',
      text: [
        "If necessary, preprocess the data before uploading.",
        "Preprocessing steps may include normalization, feature scaling, or handling missing values."
      ],
    },
    {
      key: '5',
      label: 'Specify Units',
      text: [
        "If necessary, specify units for the data before uploading.",
        "Units should be included in the header row of the CSV file or in the accompanying documentation."
      ],
    },
    {
      key: '6',
      label: 'Data Accuracy',
      text: [
        "Ensure that the data is accurate and free from errors or anomalies.",
        "Perform data validation and verification procedures to ensure accuracy."
      ],
    },
    {
      key: '7',
      label: 'Data Security',
      text: [
        "Implement appropriate security measures to protect the data from unauthorized access or modification.",
        "Use encryption, access controls, and other security protocols as needed."
      ],
    },
  ];

  const onChange = (keys) => {
    console.log(keys);
  };

  return (
    <div className="justify-center p-8">
      <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']} onChange={onChange}>
        {items.map(item => (
          <Panel key={item.key} header={item.label}>
            <ul>
              {item.text.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default HistoryPage;
