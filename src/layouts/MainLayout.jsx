import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useAuthActions } from '../hooks/useAuthActions';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const MainLayout = () => {
    const { t, i18n } = useTranslation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { logoutUser } = useAuthActions();

    return (
        
        <div className="min-h-screen w-full flex flex-col items-center bg-gray-50">
        
            <header className="w-full bg-[#1677ff] text-white h-auto min-h-[80px] md:h-[100px] max-w-[1440px] lg:px-20 md:px-8 p-4 flex justify-between items-center rounded-b-sm shrink-0 transition-all duration-300" >
                <Link to={`/${i18n.language.split('-')[0]}/invoices`} className="hover:underline">
                    <div className="text-2xl text-white font-bold">
                        Melasoft
                    </div>
                </Link>
                <div className="flex gap-x-2 items-center">
                    <LanguageSwitcher />

                    {isAuthenticated && (
                        <Button
                            type="text"
                       
                            className="text-white hover:!text-gray-200" 
                            icon={<LogoutOutlined />}
                            onClick={logoutUser}
                        >
                            {t('offline')}
                        </Button>
                    )}
                </div>
            </header>

            
            <main className="flex flex-1 flex-col w-full max-w-[1440px] lg:px-20 md:px-8 p-4 overflow-x-hidden">
                <Outlet />
            </main>

          
            <footer className="w-full bg-[#1677ff] text-white h-[50px] max-w-[1440px] lg:px-20 md:px-8 p-4 rounded-t-sm text-center flex items-center justify-center shrink-0">
                Melasoft &copy; 2025
            </footer>
        </div>
    );
};

export default MainLayout;