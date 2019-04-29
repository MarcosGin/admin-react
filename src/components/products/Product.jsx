import "./Product.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";

import {
  getProducts,
  getBrands,
  getCategories,
  addProduct,
  updateProduct,
  initUpdateForm,
  clearModal
} from "../../actions";
import CreateForm from "./CreateForm";
import TableProduct from "./table";
import UpdateForm from "./UpdateForm";

class Product extends Component {
  state = {
    modalCreateVisible: false,
    modalUpdateVisible: false
  };

  handleModalCreate = flag => {
    this.props.clearModal();
    this.setState({
      modalCreateVisible: !!flag
    });
  };

  handleAdd = data => {
    this.props.addProduct(data);
  };

  handleUpdate = data => {
    this.props.updateProduct(data);
  };

  onUpdate = item => {
    this.handleModalUpdate(true);
    this.props.initUpdateForm(item);
  };

  handleModalUpdate = flag => {
    this.props.clearModal();
    this.setState({
      modalUpdateVisible: !!flag
    });
  };

  componentDidMount() {
    this.props.getProducts({ pagination: { current: 1, pageSize: 10 } });
    this.props.getBrands();
    this.props.getCategories();
  }

  render() {
    const { data: products, isLoading: isLoadingProduct } = this.props.products;
    const { data: brands, isLoading: isLoadingBrand } = this.props.brands;
    const {
      data: categories,
      isLoading: isLoadingCategory
    } = this.props.categories;

    const { modalCreateVisible, modalUpdateVisible } = this.state;

    const paginationProps = products.pagination
      ? { showSizeChanger: true, ...products.pagination }
      : false;

    const loading =
      isLoadingProduct || isLoadingBrand || isLoadingCategory ? true : false;

    return (
      <div className="pageWrapper">
        <Card bordered={false}>
          <div className="table-header">
            <Button
              icon="plus"
              type="primary"
              onClick={() => this.handleModalCreate(true)}
            >
              Add
            </Button>
          </div>
          <TableProduct
            rowKey="id"
            loading={loading}
            dataSource={products.list}
            pagination={paginationProps}
            brands={brands}
            categories={categories}
            onUpdate={this.onUpdate}
          />
        </Card>

        <UpdateForm
          modalVisible={modalUpdateVisible}
          handleModalVisible={this.handleModalUpdate}
          brands={brands}
          categories={categories}
          handleUpdate={this.handleUpdate}
        />

        <CreateForm
          modalVisible={modalCreateVisible}
          handleModalVisible={this.handleModalCreate}
          brands={brands}
          categories={categories}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, products, brands, categories }) => {
  return {
    auth,
    products,
    brands,
    categories
  };
};

export default connect(
  mapStateToProps,
  {
    getProducts,
    getBrands,
    getCategories,
    addProduct,
    updateProduct,
    initUpdateForm,
    clearModal
  }
)(Product);
