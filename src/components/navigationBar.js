import {Button, Col, Menu, Row, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import '../css/NavigationBar.css';

const { Text } = Typography;

export const NavigationBar = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    const handleButtonClick = (path) => {
        if (token) {
            navigate(path);
        }

    };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const menuItems = [
        {
            key: 'home',
            label: (
                <Button type="link" onClick={() => handleButtonClick('/')}>
                    Home
                </Button>
            ),
        }, {
            key: 'inventory',
            label: (
                <Button type="link" onClick={() => handleButtonClick('/inventory-items')}>
                    Inventory
                </Button>
            ),

        }
    ];
    const onLogout = () => {
        navigate('/login')
        setToken('')
        localStorage.removeItem('token')
    }
    return (
        <>
            {token ? (
                <Row className="nav-bar" align="middle">
                    <Col span={22} style={{cursor: 'pointer', color: "white"}}>
                        <Menu mode="horizontal" items={menuItems}/>
                    </Col>
                    <Col span={2} style={{textAlign: 'center'}}>
                        <div className="nav-bar" onClick={onLogout}
                             style={{cursor: 'pointer', color: "rgb(12, 96, 226)"}}>Logout
                        </div>
                    </Col>
                </Row>
            ) : <></>
            }
        </>
    );
};
