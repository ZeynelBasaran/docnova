import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Navigate,useNavigate} from 'react-router-dom';
import { Card, Descriptions, Tag, Divider, Typography, Row, Col, Statistic,Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { CalendarOutlined, BankOutlined, EuroCircleOutlined } from '@ant-design/icons';
import {  ArrowLeftOutlined } from '@ant-design/icons';


const { Title } = Typography;

const Details = () => {
  const { details } = useParams();
  const { t, i18n } = useTranslation(); // i18n nesnesini de aldık (tarih formatı için gerekebilir)
  const { selectedInvoice } = useSelector((state) => state.invoice);
  const navigate = useNavigate();

  if (!selectedInvoice) {
    return <Navigate to="/invoices" replace />;
  }


  // Helper: Status rengi
  const getStatusColor = (status) => {
    switch (status) {
      case 'SENT': return 'green';
      case 'SAVED_AS_ZUGFERD': return 'blue';
      case 'ERROR': return 'red';
      default: return 'default';
    }
  };

  // Helper: Tarih formatlama (Dile duyarlı)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    // i18n.language aktif dili verir (örn: 'tr' veya 'en')
    return new Date(dateString).toLocaleDateString(i18n.language);
  };

  return (
    <Card
     variant="borderless"
      style={{ margin: 24, maxWidth: 1200, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
    >

      <Button
        type="text"
        icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
        className="text-white hover:!text-gray-200 flex items-center justify-center"
        onClick={() => navigate(-1)}
        title={t('goBack') || "Geri"} 
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {t('invoice.detailsTitle')}: {selectedInvoice.invoiceNumber}
          </Title>
          <span style={{ color: '#8c8c8c' }}>{t('invoice.id')}: {selectedInvoice.id}</span>
        </div>
        <Tag color={getStatusColor(selectedInvoice.status)} style={{ fontSize: 14, padding: '5px 10px' }}>
          {t(`invoice.status.${selectedInvoice.status}`, selectedInvoice.status)}
        </Tag>
      </div>

      <Divider />

      {/* --- BÖLÜM 1: TEMEL BİLGİLER --- */}
      <Descriptions title={t('invoice.infoTitle')} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
        <Descriptions.Item label={t('invoice.issueDate')}>
          <CalendarOutlined /> {formatDate(selectedInvoice.issueDate)}
        </Descriptions.Item>
        <Descriptions.Item label={t('invoice.dueDate')}>
          <CalendarOutlined style={{ color: 'red' }} /> {formatDate(selectedInvoice.dueDate)}
        </Descriptions.Item>
        <Descriptions.Item label={t('invoice.documentType')}>
          {/* API'den gelen 'OUTGOING' gibi değerleri çevirir, yoksa olduğu gibi yazar */}
          {t(`invoice.status.${selectedInvoice.documentType}`, selectedInvoice.documentType)}
        </Descriptions.Item>
        <Descriptions.Item label={t('invoice.format')}>{selectedInvoice.type}</Descriptions.Item>
        <Descriptions.Item label={t('invoice.currency')}>{selectedInvoice.currency}</Descriptions.Item>
        <Descriptions.Item label={t('invoice.createdDate')}>{formatDate(selectedInvoice.createdTime)}</Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* --- BÖLÜM 2: TARAFLAR --- */}
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card type="inner" title={<><BankOutlined /> {t('invoice.parties.supplier')}</>} size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label={t('invoice.parties.companyName')}>{selectedInvoice.supplierName}</Descriptions.Item>
              <Descriptions.Item label={t('invoice.parties.taxId')}>{selectedInvoice.supplierVat}</Descriptions.Item>
              <Descriptions.Item label={t('invoice.parties.country')}>{selectedInvoice.supplierCountryCode}</Descriptions.Item>
              <Descriptions.Item label={t('invoice.parties.endpoint')}>{selectedInvoice.supplierEndpoint}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} md={12} style={{ marginTop: window.innerWidth < 768 ? 16 : 0 }}>
          <Card type="inner" title={<><BankOutlined /> {t('invoice.parties.customer')}</>} size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label={t('invoice.parties.companyName')}>{selectedInvoice.customerName}</Descriptions.Item>
              <Descriptions.Item label={t('invoice.parties.taxId')}>{selectedInvoice.customerVat}</Descriptions.Item>
              <Descriptions.Item label={t('invoice.parties.country')}>{selectedInvoice.customerCountryCode}</Descriptions.Item>
              <Descriptions.Item label={t('invoice.parties.customerId')}>{selectedInvoice.customerId}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* --- BÖLÜM 3: FİNANSAL ÖZET --- */}
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Descriptions title={t('invoice.financial.statusTitle')} bordered column={1} size="small">
            <Descriptions.Item label={t('invoice.financial.paymentStatus')}>
              <Tag color={selectedInvoice.paymentDetails?.paymentStatus === 'SENT' ? 'green' : 'orange'}>
                {/* Ödeme statüsü çevirisi */}
                {t(`invoice.status.${selectedInvoice.paymentDetails?.paymentStatus}`, selectedInvoice.paymentDetails?.paymentStatus)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t('invoice.financial.paidAmount')}>
              {selectedInvoice.paymentDetails?.paidAmount} {selectedInvoice.currency}
            </Descriptions.Item>
            <Descriptions.Item label={t('invoice.financial.remainingAmount')}>
              <span style={{ color: 'red', fontWeight: 'bold' }}>
                {selectedInvoice.paymentDetails?.remainingAmount} {selectedInvoice.currency}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col xs={24} md={12}>
          <Card style={{ backgroundColor: '#f9f9f9' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title={t('invoice.financial.subTotal')}
                  value={selectedInvoice.taxExclusiveAmount}
                  precision={2}
                  suffix={selectedInvoice.currency}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={t('invoice.financial.totalPayable')}
                  value={selectedInvoice.payableAmount}
                  precision={2}
                  valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                  prefix={<EuroCircleOutlined />}
                  suffix={selectedInvoice.currency}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Details;