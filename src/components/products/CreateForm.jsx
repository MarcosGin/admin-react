import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

import { Modal } from "antd";
import AddProductForm from "../forms/AddProductForm";

class CreateForm extends Component {
  onCreate = formValues => {
    this.props.handleModalVisible();
    this.props.handleAdd(formValues);
  };

  onOk = () => {
    const { dispatch } = this.props;

    // For dispatch submit form from other component
    dispatch(submit("productAdd"));
  };

  render() {
    const { handleModalVisible, modalVisible } = this.props;

    return (
      <Modal
        destroyOnClose
        title="Creating a new product"
        visible={modalVisible}
        width={620}
        onOk={this.onOk}
        onCancel={() => handleModalVisible()}
        okText="Create"
      >
        <AddProductForm
          onSubmit={this.onCreate}
          marks={this.props.marks}
          categories={this.props.categories}
        />
      </Modal>
    );
  }
}

export default connect()(CreateForm);
