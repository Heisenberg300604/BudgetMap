import FooTer from '@/Components/ui/FooTer';
import NavbBar from '@/Components/ui/NavbBar';
import { Outlet } from 'react-router-dom'



const RootLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <NavbBar />
            <Outlet />
            <FooTer />
        </div>
    );
};

export default RootLayout;