import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div >
            <Outlet />
        </div>
    );
};

export default AuthLayout;