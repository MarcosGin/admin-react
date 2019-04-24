import "./Product.css";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Currency from "react-currency-formatter";
import moment from "moment";
import { Card, Table, Input, Button, Icon, Badge, Divider } from "antd";

import { getProducts, getBrands, getCategories } from "../../actions";
import CreateForm from "./CreateForm";

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(",");

class Product extends Component {
  state = {
    selectedRowKeys: [],
    modalVisible: false
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag
    });
  };

  onRow = (record, rowIndex) => {
    return {
      onClick: e => {
        console.log(record);
      }
    };
  };

  handleOnChange = (pagination, filtersArg, sorter) => {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      let keys = key.split(".");
      const newObj = { ...obj };

      let value = getValue(filtersArg[key]);

      if (value) {
        newObj[keys[0]] = value;
      } else {
        delete newObj[keys[0]];
      }

      return newObj;
    }, {});

    const params = {
      pagination,
      filters
    };

    if (sorter.field) {
      const key = sorter.field.split(".");
      params.sorter = `${key[0]}_${sorter.order}`;
    }

    this.props.getProducts(params);
  };

  handleAdd = data => {
    console.log(data);
  };

  parseToFilters = items => {
    return _.map(items, item => {
      return {
        text: item.name,
        value: item.id
      };
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

    const { modalVisible, selectedRowKeys } = this.state;

    const paginationProps = products.pagination
      ? { showSizeChanger: true, ...products.pagination }
      : false;

    const filtersBrand = this.parseToFilters(brands);
    const filtersCategories = this.parseToFilters(categories);

    const loading =
      isLoadingProduct || isLoadingBrand || isLoadingCategory ? true : false;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      columnWidth: "1%"
    };

    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        width: "25%",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search by title`}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={() => confirm()}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type="search"
            style={{ color: filtered ? "#1890ff" : undefined }}
          />
        ),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        sorter: true
      },
      {
        title: "Brand",
        width: "12%",
        dataIndex: "mark.name",
        filtered: true,
        filters: filtersBrand
      },
      {
        title: "Category",
        width: "12%",
        dataIndex: "category.name",
        filtered: true,
        filters: filtersCategories
      },
      {
        title: "Price",
        width: "5%",
        dataIndex: "price",
        sorter: true,
        render: text => {
          return <Currency quantity={text} decimal="," group="." />;
        }
      },
      {
        title: "Stock",
        width: "5%",
        dataIndex: "stock",
        sorter: true,
        align: "center",
        render: text => {
          let backgroundColor = "#f5222d";
          if (text > 100) {
            backgroundColor = "#52c41a";
          } else if (text >= 30 && text < 100) {
            backgroundColor = "#fa8c16";
          }
          return <Badge count={text} showZero style={{ backgroundColor }} />;
        }
      },
      {
        title: "Created",
        width: "12%",
        dataIndex: "createdAt.date",
        sorter: true,
        render: text => <span>{moment(text).format("D/MM/YY h:mm")}</span>
      },
      {
        title: "Actions",
        width: "12%",
        key: "action",
        align: "center",
        render: (text, record) => (
          <Fragment>
            <Button
              onClick={() => console.log(`Edit ${record}`)}
              icon="edit"
              size="small"
            />
            <Divider type="vertical" />
            <Button
              onClick={() => console.log(`Delete ${record}`)}
              icon="delete"
              size="small"
            />
          </Fragment>
        )
      }
    ];

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
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            onRow={this.onRow}
            columns={columns}
            loading={loading}
            dataSource={products.list}
            onChange={this.handleOnChange}
            pagination={paginationProps}
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
  { getProducts, getBrands, getCategories }
)(Product);
