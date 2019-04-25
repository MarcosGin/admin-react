import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

import { Modal } from "antd";
import AddProductForm from "../forms/AddProductForm";

class CreateForm extends Component {
  onCreate = formValues => {
    this.props.handleAdd(formValues);
  };

  onOk = () => {
    const { dispatch } = this.props;
    dispatch(submit("productAdd"));
  };

  componentDidUpdate(prevProps, prevState) {
    const { products: prevProducts } = prevProps;
    const { products: currentProducts, handleModalVisible } = this.props;

    if (
      prevProducts.created !== currentProducts.created ||
      prevProducts.isCreating !== currentProducts.isCreating
    ) {
      if (currentProducts.created === true && !currentProducts.isCreating) {
        handleModalVisible();
        //Maybe update here the getproducts
      }
    }
  }

  render() {
    const {
      handleModalVisible,
      modalVisible,
      brands,
      categories,
      products
    } = this.props;

    const { isCreating } = products;

    return (
      <Modal
        destroyOnClose
        title="Creating a new product"
        visible={modalVisible}
        width={620}
        onOk={this.onOk}
        onCancel={() => handleModalVisible()}
        okText="Create"
        okButtonProps={{ loading: isCreating }}
        cancelButtonProps={{ disabled: isCreating }}
      >
        <AddProductForm
          onSubmit={this.onCreate}
          brands={brands}
          categories={categories}
          isCreating={isCreating}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(CreateForm);
