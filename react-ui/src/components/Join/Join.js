import React, { Component }from 'react';
import { Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      email: ''
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      const { userName, email, password } = values;
      // addUser(userName, email, password).then(user => {
      //   message.success("Thanks for signing up!");
      // })
      this.props.history.push('/profile');
    })
  }

  setEmail(e) {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('userName', {
            rules: [{
              required: true, message: 'Please input your name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input
              value={this.state.email}
              onChange={this.setEmail}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Join</Button>
          <br />
          Already have an account? <a href="./login">Log In.</a>
        </FormItem>
      </Form>
      </div>
    );
  }
}

export const WrappedRegistrationForm = Form.create()((RegistrationForm));
