import "./AddProductForm.css";

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

import { Input, Select, Icon, Form, InputNumber } from "antd";

const { Option } = Select;

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

  renderSelect = ({ input, meta, placeholder }) => {
    const errorMessage = this.getErrorMessage(meta);

    /* To be able to show the placeholder, the value of the select must be undefined */
    input.value = input.value ? input.value : undefined;

    return (
      <Form.Item
        validateStatus={errorMessage ? "error" : "validating"}
        help={errorMessage}
      >
        <Select placeholder={placeholder} {...input}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>
    );
  };

  renderInputNumber = ({
    input,
    meta,
    placeholder,
    formatter = undefined,
    parser = undefined
  }) => {
    const errorMessage = this.getErrorMessage(meta);
    return (
      <Form.Item
        validateStatus={errorMessage ? "error" : "validating"}
        help={errorMessage}
      >
        <InputNumber
          value={input.value}
          placeholder={placeholder}
          formatter={formatter}
          parser={parser}
          onChange={input.onChange}
          style={{ width: "100%" }}
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
        <Field name="mark" placeholder="Brand" component={this.renderSelect} />
        <Field
          name="category"
          placeholder="Category"
          component={this.renderSelect}
        />
        <Field
          name="price"
          placeholder="Price"
          component={this.renderInputNumber}
          formatter={value =>
            value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
          }
          parser={value => value.replace(/\$\s?/g, "").replace(/\./g, "")}
        />
        <Field
          name="stock"
          placeholder="Stock"
          component={this.renderInputNumber}
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
  if (!formValues.mark) {
    errors.mark = "Please select a brand";
  }
  if (!formValues.category) {
    errors.category = "Please select a category";
  }
  if (!formValues.price) {
    errors.price = "Please enter a price";
  }
  return errors;
};

export default reduxForm({ form: "productAdd", validate })(AddProductForm);
