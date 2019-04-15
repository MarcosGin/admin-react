import "./AddProductForm.css";

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

import { Input, Icon, Form } from "antd";

class AddProductForm extends Component {
  getErrorMessage({ error, touched }) {
    if (touched && error) {
      return error;
    }
  }

  renderText = ({ input, meta, placeholder, icon, autoComplete = "off" }) => {
    const errorMessage = this.getErrorMessage(meta);
    return (
      <Form.Item
        validateStatus={errorMessage ? "error" : "validating"}
        help={errorMessage}
      >
        <Input
          prefix={<Icon type={icon} />}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...input}
        />
      </Form.Item>
    );
  };

  render() {
    return (
      <form
        className="form-product"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Field
          name="title"
          placeholder="Title"
          icon="profile"
          component={this.renderText}
        />
      </form>
    );
  }
}
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Please enter a title";
  }
  return errors;
};

export default reduxForm({ form: "productAdd", validate })(AddProductForm);
