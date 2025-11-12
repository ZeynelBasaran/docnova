import '@ant-design/v5-patch-for-react-19';
import { Form, Input, Button, message, Card } from 'antd';
import { postData } from './api';



function App() {

  const [form] = Form.useForm();

  const onFinish =async (values) => {
    try {
      const response = await postData("/auth/login/dev", values);
      console.log("POST yanıtı:", response);
      message.success('Giriş başarılı!');
    } catch (error) {
      console.error("POST hatası:", error);
    }
  };

  const onFinishFailed = () => {
    message.error('Hatalı şifre veya e-posta!');
  };

  return (
    <main className='max-w-[1440px]  flex justify-center items-center w-full h-full'>
      <Card title="Giriş Yap" style={{ width: 380 }}>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item
            label="E-posta"
            name="email"
            rules={[
              { required: true, message: 'E-posta alanı zorunludur!' },
              { type: 'email', message: 'Geçerli bir e-posta giriniz!' },
            ]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>


          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Şifre alanı zorunludur!' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>


    </main>
  )
}

export default App
