import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const UploadFile = ({ setDataSource }) => {

  const handleFileUpload = async (file) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const binaryStr = e.target.result;
        const workBook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        setDataSource(prevData => [...prevData, ...jsonData]);

        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        console.error('Error reading the Excel file:', error);
        message.error('Failed to upload the Excel file.');
      }
    };

    reader.readAsBinaryString(file);
    return false;
  };

  return (
    <Upload
      beforeUpload={handleFileUpload}
      showUploadList={false}
      accept=".xlsx, .xls"
    >
      <Button icon={<UploadOutlined />}>Upload Excel File</Button>
    </Upload>
  );
};

export default UploadFile;
