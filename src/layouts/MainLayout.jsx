import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useAuthActions } from '../hooks/useAuthActions';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';


const MainLayout = () => {
    const { t } = useTranslation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { logoutUser } = useAuthActions();


    


    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <header className="w-full bg-[#1677ff] text-white h-[100px] max-w-[1440px] lg:px-20 md:px-8 p-4 flex justify-between rounded-b-sm items-center" >
                <Link to="/invoices" className="hover:underline">
                    <div className="text-2xl text-white">
                        Melasoft
                    </div>
                </Link>
                <div className="flex gap-x-2">
                    <LanguageSwitcher />

                    {isAuthenticated && (
                        <Button
                            type="text"
                            color="outlined" variant="solid"
                            icon={<LogoutOutlined />}
                            onClick={logoutUser}
                        >
                            {t('offline')}
                        </Button>
                    )}


                </div>
            </header>

            <main className="flex flex-1 flex-col justify-center items-center max-w-[1440px] lg:px-20 md:px-8 p-4">
                <Outlet />
            </main>

            <footer className="w-full bg-[#1677ff] text-white h-[50px] max-w-[1440px] lg:px-20 md:px-8 p-4 rounded-t-sm text-center">
                Melasoft &copy; 2025
            </footer>
        </div>
    );
};

export default MainLayout;
