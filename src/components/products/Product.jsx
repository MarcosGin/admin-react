import "./Product.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, Button } from "antd";

import {
  getProducts,
  getBrands,
  getCategories,
  addProduct,
  clearModal
} from "../../actions";
import CreateForm from "./CreateForm";
import TableProduct from "./table";

class Product extends Component {
  state = {
    modalVisible: false
  };

  handleModalVisible = flag => {
    this.props.clearModal();
    this.setState({
      modalVisible: !!flag
    });
  };

  handleAdd = data => {
    this.props.addProduct(data);
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

    const { modalVisible } = this.state;

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
              onClick={() => this.handleModalVisible(true)}
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
          />
        </Card>

        <CreateForm
          modalVisible={modalVisible}
          handleModalVisible={this.handleModalVisible}
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
  { getProducts, getBrands, getCategories, addProduct, clearModal }
)(Product);
