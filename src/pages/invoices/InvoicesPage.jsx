import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { fetchInvoices, setSelectedInvoice } from '../../store/invoice/invoiceSlice'; 
import { Table, Card, Spin, Alert, Tag, Typography, Space, Button } from 'antd';
import { FileTextOutlined, ExportOutlined, ImportOutlined, EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const InvoicesPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invoices, loading, error } = useSelector((state) => state.invoice);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchInvoices({}));
    }
  }, [dispatch, user]);

  const handleDetail = (record) => {
    dispatch(setSelectedInvoice(record));
    navigate(`/invoices/${record.id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(i18n.language);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SENT': return 'success';
      case 'SAVED_AS_ZUGFERD': return 'processing';
      case 'ERROR': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: t('details.type'),
      dataIndex: 'documentType',
      key: 'documentType',
      width: 80,
      align: 'center',
      render: (type) => (
        type === 'OUTGOING' 
          ? <ExportOutlined style={{ color: 'orange', fontSize: 18 }} title={t('details.statusMap.OUTGOING')} />
          : <ImportOutlined style={{ color: 'blue', fontSize: 18 }} title={t('details.statusMap.INCOMING')} />
      ),
      responsive: ['sm'], 
    },
    {
      title: t('details.invoiceNumber'),
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: t('details.customer'),
      dataIndex: 'customerName', 
      key: 'customerName',
      render: (text, record) => record.customerName || record.supplierName || '-',
      responsive: ['md'], 
    },
    {
      title: t('details.issueDate'),
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date) => formatDate(date),
      responsive: ['lg'], 
    },
    {
      title: t('details.dueDate'),
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => (
        <span style={{ color: new Date(date) < new Date() ? 'red' : 'inherit' }}>
          {formatDate(date)}
        </span>
      ),
      responsive: ['lg'],
    },
    {
      title: t('details.amount'),
      dataIndex: 'payableAmount',
      key: 'payableAmount',
      align: 'right',
      render: (amount, record) => (
        <Text type="success" strong>
          {new Intl.NumberFormat(i18n.language, { style: 'currency', currency: record.currency || 'EUR' }).format(amount)}
        </Text>
      ),
    },
    {
      title: t('details.status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {t(`details.statusMap.${status}`, status)}
        </Tag>
      ),
      responsive: ['md'], 
    },
   
    {
      title: t('details.actions'), 
      key: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Button 
          type="primary" 
          ghost 
          size="small"
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleDetail(record);
          }}
        >
          {t('details.view')}
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '300px' 
      }}>
        <Spin size="large" />
        
        <div style={{ marginTop: '16px', color: '#666' }}>
          {t('details.loading')}
        </div>
      </div>
    );
  }  
  if (error) return <Alert message={t('details.dataFetchError')} description={error} type="error" showIcon style={{ margin: 24 }} />;

  return (
    <Card 
      title={
        <Space>
          <FileTextOutlined />
          {t('details.listTitle')}
        </Space>
      }
      style={{ 
        margin: '24px auto',
        width: '100%',     
        maxWidth: '1440px' 
      }}
    >
      <Table
        columns={columns}
        dataSource={invoices}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        onRow={(record) => ({
          onClick: () => handleDetail(record),
          style: { cursor: 'pointer' },
        })}
        rowClassName="cursor-pointer hover:bg-gray-50"
      />
    </Card>
  );
};

export default InvoicesPage;