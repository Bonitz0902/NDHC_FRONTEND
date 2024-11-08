import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Typography, Popconfirm, notification, Button, Form, InputNumber, Input, Row, Col, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';
import * as XLSX from 'xlsx';
import ManualAddModal from '../components/manualAddModal';
import FileUpload from '../utility/fileUpload';
import '../css/ConsolidatedInventory.css';
import { useDispatch } from 'react-redux';
import { editRecordRequest, deleteRecordRequest } from '../api/inventory/actions';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function ConsolidatedInventory() {
  const dispatch = useDispatch();
  const [inventory, setInventory] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const notificationShown = useRef(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/consolidatedInventory')
      .then(response => {
        setInventory(response.data);
        showNotification('success', 'Data fetched successfully!');
        notificationShown.current = true;
      })
      .catch(error => {
        console.error('There was an error fetching the inventory data!', error);
        showNotification('error', 'Failed to fetch data.');
        notificationShown.current = true;
      });
  }, [refreshData]);

  const showNotification = (type, message) => {
    notification[type]({
        message: message,
        duration: 2,
        placement: 'top'
      });
    };

  const isEditing = (record) => record && record.propertyNo === editingKey;

  const editRecord = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.propertyNo);
  };

  const cancelEdit = () => {
    setEditingKey('');
  };

  const saveEdit = async (record) => {
    try {
      const row = await form.validateFields();
      const updatedData  = {...record, ...row};
      dispatch(editRecordRequest(updatedData));
      setEditingKey('');
      setRefreshData(!refreshData);
    } catch (errInfo) {
        console.log('Update Failed:', errInfo);
    }
};


  const handleAddRecord = () => {
    setRefreshData(!refreshData);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const deleteRecord = (values) => {
    dispatch(deleteRecordRequest(values.propertyNo))
    setRefreshData(!refreshData)
  }

  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const binaryStr = e.target.result;
        const workBook = XLSX.read(binaryStr, { type: 'binary' });
        const sheet = workBook.Sheets['Sheet1'];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setInventory((prevData) => [...prevData, ...jsonData]);
      } catch (error) {
        console.error('Error reading the Excel file:', error);
      }
    };
    reader.readAsBinaryString(file);
    return false;
  };

  const getColumnWidth = (title) => {
    const minWidth = 150;
    const widthMultiplier = 10;
    return Math.max(minWidth, title.length * widthMultiplier);
  };
  
  const columns = [
    {
      title: 'QR Code',
      dataIndex: 'quickResponseCode',
      key: 'qrCode',
      editable: false,
      width: getColumnWidth('QR Code'),
      align: 'center',
      render: (text, record) => (
        <QRCodeSVG
          value={`${record.fundCode}-${record.dateAcquired}-${record.propertyNo}`}
          size={64}
        />
      ),
    },
    {
      title: 'EXECUTIVE / LEGISLATIVE',
      dataIndex: 'branch',
      key: 'branch',
      editable: true,
      width: getColumnWidth('EXECUTIVE / LEGISLATIVE'),
      align: 'center',
    },
    {
      title: 'FUND CODE',
      dataIndex: 'fundCode',
      key: 'fundCode',
      editable: true,
      width: getColumnWidth('FUND CODE'),
      align: 'center',
    },
    {
      title: 'DATE ACQUIRED',
      dataIndex: 'dateAcquired',
      key: 'dateAcquired',
      editable: true,
      width: getColumnWidth('DATE ACQUIRED'),
      align: 'center',
    },
    {
      title: 'ARTICLE',
      dataIndex: 'article',
      key: 'article',
      editable: true,
      width: getColumnWidth('ARTICLE'),
      align: 'center',
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      width: getColumnWidth('DESCRIPTION'),
      align: 'center',
    },
    {
      title: 'PROPERTY NO',
      dataIndex: 'propertyNo',
      key: 'propertyNo',
      editable: true,
      width: getColumnWidth('PROPERTY NO'),
      align: 'center',
    },
    {
      title: 'UNIT VALUE',
      dataIndex: 'unitValue',
      key: 'unitValue',
      editable: true,
      width: getColumnWidth('UNIT VALUE'),
      align: 'center',
    },
    {
      title: 'ON HAND PER CARD (QTY)',
      dataIndex: 'onHandPerCard',
      key: 'onHandPerCard',
      editable: true,
      width: getColumnWidth('ON HAND PER CARD (QTY)'),
      align: 'center',
    },
    {
      title: 'NAME OF AGENCY',
      dataIndex: 'agencyName',
      key: 'agencyName',
      editable: true,
      width: getColumnWidth('NAME OF AGENCY'),
      align: 'center',
    },
    {
      title: 'NAME OF ACCOUNTABLE OFFICER',
      dataIndex: 'accountableOfficerName',
      key: 'accountableOfficerName',
      editable: true,
      width: getColumnWidth('NAME OF ACCOUNTABLE OFFICER'),
      align: 'center',
    },
    {
      title: 'DESIGNATION',
      dataIndex: 'designation',
      key: 'designation',
      editable: true,
      width: getColumnWidth('DESIGNATION'),
      align: 'center',
    },
    {
      title: 'DISPOSE/TRANSFER (QTY)',
      dataIndex: 'disposeOrTransfer',
      key: 'disposeOrTransfer',
      editable: true,
      width: getColumnWidth('DISPOSE/TRANSFER (QTY)'),
      align: 'center',
    },
    {
      title: 'REMARKS',
      dataIndex: 'remarks',
      key: 'remarks',
      editable: true,
      width: getColumnWidth('REMARKS'),
      align: 'center',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      width: getColumnWidth('ACTIONS'),
      align: 'center',
      render: (_, values) => {
        const editable = isEditing(values);
        return (
          <>
            {editable ? (
              <>
                <Typography.Link onClick={() => saveEdit(values)}>
                  <EditOutlined style={{ color: 'blue', marginRight: 8 }} />
                </Typography.Link>
                <Popconfirm title="Are you sure you want to cancel?" onConfirm={cancelEdit}>
                  <Button type="link">Cancel</Button>
                </Popconfirm>
              </>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => editRecord(values)}>
                <EditOutlined style={{ color: 'blue', marginRight: 8 }} />
              </Typography.Link>
            )}
            <Popconfirm title="Are you sure you want to delete?" onConfirm={() => deleteRecord(values)}>
              <Typography.Link>
                <DeleteOutlined style={{ color: 'red', marginLeft: 8 }} />
              </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    }
  ];
  

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'unitValue' || col.dataIndex === 'onHandPerCard' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const showSelectedRowIds = () => {
    const message = selectedRowKeys.length > 0 
      ? `Selected Row IDs: ${selectedRowKeys.join(', ')}`
      : 'No rows selected.';
    showNotification('info', message);
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col>
          <h1 style={{ textAlign: 'center' }}>Consolidated Inventory</h1>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
        <Col span={10} />
        <Col span={8} style={{ textAlign: 'right' }}>
          <Tooltip title="Please select rows to see their IDs." placement="top" disabled={selectedRowKeys.length > 0}>
            <span>
              <Button 
                type="default" 
                onClick={showSelectedRowIds} 
                style={{ marginRight: '16px' }}
                disabled={selectedRowKeys.length === 0}
              >
                Show Selected IDs
              </Button>
            </span>
          </Tooltip>
          <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
            Manual Add
          </Button>
          <span style={{ marginLeft: '16px' }}>
            <FileUpload onFileUpload={handleFileUpload} setDataSource={setInventory} />
          </span>
        </Col>
      </Row>
      <Form form={form} component={false}>
        <Table
          components={{
            body: { cell: EditableCell },
          }}
          rowSelection={rowSelection}
          dataSource={inventory}
          columns={mergedColumns}
          rowKey="propertyNo"
          scroll={{ y: 400 }}
          className="custom-table"
        />
      </Form>
      <ManualAddModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSubmit={handleAddRecord}
      />
    </div>
  );
}

export default ConsolidatedInventory;