import { Col, Row, Button, Card } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import '../css/LandingPageDesign.css';

export const LandingPage = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => navigate("/inventory-items");

    return (
        <div className="div-landing">
            <Row className="row-landing" justify="space-around" align="middle">
                <Col span={12} className="text-section">
                    <h1 className="landing-title">Inventory Management System</h1>
                    <Button type="primary" size="large" onClick={handleButtonClick} className="landing-button">
                        Proceed to Inventory <ArrowRightOutlined />
                    </Button>
                </Col>
                <Col span={10} className="card-section">
                    <Card
                        hoverable
                        title="About Our System"
                        className="landing-card"
                    >
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
