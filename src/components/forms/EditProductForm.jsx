import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import { Input, Select, Icon, Form, InputNumber } from "antd";
import TextArea from "../common/TextArea/TextArea";

const { Option } = Select;

class EditProductForm extends Component {
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
          prefix={icon ? <Icon type={icon} /> : null}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...input}
        />
      </Form.Item>
    );
  };

  _renderOptions = values => {
    if (_.isUndefined(values) || _.isNull(values)) {
      return null;
    }

    return values.map(option => (
      <Option value={option.id} key={option.id}>
        {option.name}
      </Option>
    ));
  };

  renderSelect = ({ input, meta, placeholder, options }) => {
    const errorMessage = this.getErrorMessage(meta);

    /* To be able to show the placeholder, the value of the select must be undefined */
    input.value = input.value ? input.value : undefined;

    return (
      <Form.Item
        validateStatus={errorMessage ? "error" : "validating"}
        help={errorMessage}
      >
        <Select placeholder={placeholder} {...input}>
          {this._renderOptions(options)}
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
          onBlur={
            _.isUndefined(formatter) && _.isUndefined(parser)
              ? input.onBlur
              : undefined
          }
          style={{ width: "100%" }}
        />
      </Form.Item>
    );
  };

  renderEditorArea = ({ input, meta, placeholder }) => {
    const errorMessage = this.getErrorMessage(meta);

    return (
      <Form.Item
        validateStatus={errorMessage ? "error" : "validating"}
        help={errorMessage}
      >
        <TextArea {...input} hasError={errorMessage} />
      </Form.Item>
    );
  };
  render() {
    return (
      <form
        className="form-product"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Field name="title" placeholder="Title" component={this.renderText} />
        <Field
          name="description"
          placeholder="Description"
          component={this.renderEditorArea}
        />
        <Field
          name="brand"
          placeholder="Brand"
          options={this.props.brands}
          component={this.renderSelect}
        />
        <Field
          name="category"
          placeholder="Category"
          options={this.props.categories}
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
        <button
          type="submit"
          style={{ display: "none" }}
          disabled={this.props.isUpdating}
        />
      </form>
    );
  }
}

const validate = ({ title, description, brand, category, price }) => {
  const errors = {};
  if (!title) {
    errors.title = "Please enter a title";
  }
  if (!description) {
    errors.description = "Please enter a description";
  }
  if (!brand) {
    errors.brand = "Please select a brand";
  }
  if (!category) {
    errors.category = "Please select a category";
  }
  if (!price) {
    errors.price = "Please enter a price";
  }
  return errors;
};

export default reduxForm({
  form: "productEdit",
  validate,
  enableReinitialize: true
})(EditProductForm);
