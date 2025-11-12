import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

const InvoicesPage = () => {
  const { t } = useTranslation();
  
  return (
    <Card title={t('invoices')}>
      <p>{t('invoices_page_content')}</p>
    </Card>
  );
};

export default InvoicesPage;
