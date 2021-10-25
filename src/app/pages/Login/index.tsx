import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Input, Checkbox, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { RootState } from 'app/reducers';
import styles from './style.scss';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef<any>(null);
  // const [list, setList] = useState<InfoListType[]>([]);
  const { showMenu } = useSelector((state: RootState) => state.ui_status);
  useEffect(() => {
    // test 发送 dispatch
    setTimeout(() => {
      dispatch({
        type: 'UI_SHOW_MENU',
        payload: { showMenu: !showMenu }
      });
    }, 3000);
  }, []);

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    // const { username, password } = values;
    // 根据后端接口验证账号密码是否正常, 异常时，使用 toast 提示
    console.log('Success:', values);
    message.success('登录成功');
    // 跳转到首页
    history.push('/');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const checkPassword = (value) => {
  //   if (value === '1') {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject(new Error('密码不正确!'));
  // };

  // 验证账号是否已经被添加过
  // const checkAccount = (value: string | number) => {
  //   // 这个是rules自定义的验证方法
  //   return new Promise((resolve, reject) => {
  //     if (!value) {
  //       resolve(true);
  //     }
  //     setTimeout(() => {
  //       // 调接口
  //       resolve(false);
  //     }, 1000);
  //   });
  // };

  const formRules = {
    username: [
      { required: true, message: 'Please input your username!' }
      // {
      //   validator: (rule, value, callback) => {
      //     checkAccount(value).then((res) => {
      //       if (res) {
      //         callback();
      //       } else {
      //         callback('账号已存在');
      //       }
      //     });
      //   }
      // }
    ],
    password: [{ required: true, message: 'Please input your password!' }]
  };

  return (
    <Modal wrapClassName="login_modal" visible={true} footer={null} closable={false}>
      <Form
        ref={formRef}
        name="login"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="账号" name="username" rules={formRules.username}>
          <Input placeholder="账号" size="large" />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={formRules.password}>
          <Input.Password placeholder="密码" size="large" />
        </Form.Item>
        <Form.Item className={styles.special_form_item}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <a className={styles.login_form_forgot} href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button className={styles.login_btn} type="primary" htmlType="submit" danger>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
