import { Layout, Menu, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

const { Header, Content } = Layout;

export const InvoicesLayout = () => {
  const { t } = useTranslation();
  const { logoutUser } = useAuthActions();

  return (
    <Layout className="invoices-layout">

        Deneme
      <Header className="invoices-header">
        <div className="logo">DocNova</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['invoices']}>
          <Menu.Item key="invoices">
            <Link to="/invoices">{t('invoices')}</Link>
          </Menu.Item>
          <Menu.Item key="customers">
            <Link to="/invoices/customers">{t('customers')}</Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link to="/invoices/settings">{t('settings')}</Link>
          </Menu.Item>
          <Menu.Item key="logout" style={{ marginLeft: 'auto' }}>
            <Button 
              type="text" 
              onClick={logoutUser} 
              icon={<LogoutOutlined />}
              style={{ color: 'white' }}
            >
              {t('logout')}
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="invoices-content">
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default InvoicesLayout;
