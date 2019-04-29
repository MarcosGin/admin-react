import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

import { Modal, Spin } from "antd";
import _ from "lodash";

import { getProducts } from "../../actions";
import EditProductForm from "../forms/EditProductForm";

class UpdateForm extends Component {
  onUpdate = formValues => {
    this.props.handleUpdate(formValues);
  };

  onOk = () => {
    this.props.updated();
  };

  parseToInitialValues = data => {
    const initialValues = _.mapValues(data, item =>
      _.isObject(item) ? item.id : item
    );
    return initialValues;
  };

  componentDidUpdate(prevProps, prevState) {
    const { products: prevProducts } = prevProps;
    const { products: currentProducts, handleModalVisible } = this.props;

    if (
      prevProducts.updated !== currentProducts.updated ||
      prevProducts.isUpdating !== currentProducts.isUpdating
    ) {
      if (currentProducts.updated === true && !currentProducts.isUpdating) {
        handleModalVisible();
        this.props.getProducts(this.props.products.filters);
      }
    }
  }

  render() {
    const {
      handleModalVisible,
      modalVisible,
      brands,
      categories,
      products: { isUpdating, edit }
    } = this.props;

    const getForm = () => {
      if (edit.loading) {
        return (
          <div className="modal-loading">
            <Spin size="large" />
          </div>
        );
      }
      return (
        <EditProductForm
          onSubmit={this.onUpdate}
          initialValues={this.parseToInitialValues(edit.data)}
          brands={brands}
          categories={categories}
          isLoading={edit.loading}
          isUpdating={isUpdating}
        />
      );
    };
    return (
      <Modal
        destroyOnClose
        title="Updating a product"
        visible={modalVisible}
        width={620}
        onOk={this.onOk}
        onCancel={() => handleModalVisible()}
        okText="Update"
        okButtonProps={{ loading: isUpdating, disabled: edit.loading }}
        cancelButtonProps={{ disabled: isUpdating || edit.loading }}
      >
        {getForm()}
      </Modal>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: filters => dispatch(getProducts(filters)),
    updated: () => dispatch(submit("productEdit"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateForm);
