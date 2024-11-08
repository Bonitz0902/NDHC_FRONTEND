import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export const ErrorPage = () => {
    const navigate = useNavigate();

    const goBackHome = () => {
        navigate("/");
    }

    return (
        <Result
            status="500"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary" onClick={() => goBackHome()}>Back Home</Button>}
        />
    );
}