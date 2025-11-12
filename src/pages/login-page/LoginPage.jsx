
import { useTranslation, } from 'react-i18next';
import { message, Form, Input, Card, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LoginPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { loginUser } = useAuthActions();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);


  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/invoices");
    }
  }, [isAuthenticated, user, navigate]);

  const onFinish = async (values) => {
    const newC = {email:"devmelauser@yopmail.com",password:"Work123???"};

    const { success } = await loginUser(newC);
    if (success) {
      message.success(t('login_success'));
    } else {
      message.error(error || t('login_error'));
    }
  };

  const onFinishFailed = () => {
    message.error(t('login_validation_error'));
  };

  return (
    <div className="" >
      <Card title={t('login')} style={{ width: 370, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={t('email')}
            name="email"
            rules={[
              { required: true, message: t('email_required') },
              { type: 'email', message: t('email_invalid') }
            ]}
          >
            <Input placeholder={t('email')} />
          </Form.Item>
          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              { required: true, message: t('password_required') },
              { min: 6, message: t('password_min_length') }
            ]}
          >
            <Input.Password placeholder={t('password')} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: '24px' }}
              loading={loading}
              disabled={loading}
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;