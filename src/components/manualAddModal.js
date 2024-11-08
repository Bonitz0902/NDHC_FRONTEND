
import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { saveRecord } from '../api/inventory/actions';

export const ManualAddModal = ({ isVisible: isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values)
      dispatch(saveRecord(values))
      form.resetFields()
    });
  };

  return (
    <Modal
      title="Add New Record"
      open={isOpen}
      onCancel={onClose}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="branch" label="Executive/Legislative">
          <Input />
        </Form.Item>
        <Form.Item name="fundCode" label="Fund Code">
          <Input />
        </Form.Item>
        <Form.Item name="dateAcquired" label="Date Acquired">
          <Input />
        </Form.Item>
        <Form.Item name="article" label="Article">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="propertyNo" label="Property No">
          <Input />
        </Form.Item>
        <Form.Item name="unitValue" label="Unit Value">
          <Input />
        </Form.Item>
        <Form.Item name="onHandPerCard" label="On Hand Per Card">
          <Input />
        </Form.Item>
        <Form.Item name="agencyName" label="Name of Agency">
          <Input />
        </Form.Item>
        <Form.Item name="accountableOfficerName" label="Name of Accountable Officer">
          <Input />
        </Form.Item>
        <Form.Item name="designation" label="Designation">
          <Input />
        </Form.Item>
        <Form.Item name="disposeOrTransfer" label="Dispose/Transfer">
          <Input />
        </Form.Item>
        <Form.Item name="remarks" label="Remarks">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManualAddModal;