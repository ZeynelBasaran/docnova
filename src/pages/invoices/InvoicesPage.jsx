import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../store/invoice/invoiceSlice';
import { Table, Button, Card, Spin, Alert } from 'antd';


const InvoicesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Redux'tan verileri çekiyoruz
  const { invoices, loading, error } = useSelector((state) => state.invoice);
  const { user } = useSelector((state) => state.auth);


  console.log("faturalar",invoices)

  useEffect(() => {
    // Sayfa yüklendiğinde ve user varsa faturaları çek
    if (user) {
      console.log("User mevcut veriler çekiliyor...");
      dispatch(fetchInvoices({}));
    }
  }, [dispatch, user]);



  const columns = [
    {
      title: 'Fatura Adı',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Tutar (€)',
      dataIndex: 'payableAmount',
      key: 'payableAmount',
      render: (amount) => `${amount} €`,
    },
    {
      title: 'Açıklama',
      dataIndex: 'customerName', // description alanı yoktu, customerName örnek olarak kullanıldı
      key: 'customerName',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetail(record)}>
          Detay
        </Button>
      ),
    },
  ];

  const handleDetail = (record) => {
    console.log('Detay butonuna tıklandı:', record);
    // örnek: navigate(`/invoices/${record.id}`)
  };


  if (loading) {
  return (
    <Spin tip="Loading...">
      
    </Spin>
 
  );
}
  if (error) return <Alert message="Veri alınamadı" description={error} type="error" />;

  return (
    <Card title="Faturalar" style={{ margin: 24 }}>
      <Table
        columns={columns}
        dataSource={invoices}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default InvoicesPage;


/*
  <Card title={t('invoices')}>
      
    
      {error && (
        <Alert 
          message="Hata" 
          description={typeof error === 'object' ? JSON.stringify(error) : error} 
          type="error" 
          showIcon 
          style={{ marginBottom: 16 }} 
        />
      )}

   
      <Table 
        dataSource={invoices} 
        columns={columns} 
        rowKey="id" // Benzersiz ID alanını buraya yazın
        loading={loading} // Yükleniyor animasyonu
        locale={{ emptyText: t('no_data') }} // Veri yoksa çıkacak yazı
      />
      
    </Card>

*/