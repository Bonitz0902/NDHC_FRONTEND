import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { NavigationBar } from '../components/navigationBar';
import ConsolidatedInventory from '../components/consolidatedInventory';
import '../css/DetailPage.css';

export const DetailPage = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <NavigationBar />
      <div style={{ padding: '16px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button
                type="secondary"
                onClick={goBackHome}
                className="back-home-button"
                icon={<ArrowLeftOutlined />}
              >
                Home
              </Button>
            </Space>
          </Col>
        </Row>
        <ConsolidatedInventory />
      </div>
    </>
  );
};

export default DetailPage;