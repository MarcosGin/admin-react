import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "antd";

import Currency from "react-currency-formatter";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";

import { getProducts } from "../../../actions";

import TitleDropdown from "./columns/TitleDropdown";
import StockRender from "./columns/StockRender";
import ActionRender from "./columns/ActionRender";

class TableProduct extends Component {
  state = {
    selectedRowKeys: []
  };

  getValue = obj =>
    Object.keys(obj)
      .map(key => obj[key])
      .join(",");

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onRow = (record, rowIndex) => {
    return {
      onClick: e => {
        // dispatch on select product view
      }
    };
  };

  onChange = (pagination, filtersArg, sorter) => {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      let keys = key.split(".");
      const newObj = { ...obj };

      let value = this.getValue(filtersArg[key]);

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

  parseToFilters = items => {
    return _.map(items, item => {
      return {
        text: item.name,
        value: item.id
      };
    });
  };

  render() {
    const {
      rowKey,
      pagination,
      dataSource,
      loading,
      brands,
      categories
    } = this.props;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      columnWidth: "1%"
    };
    const filtersBrand = this.parseToFilters(brands);
    const filtersCategories = this.parseToFilters(categories);

    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        width: "25%",
        filterDropdown: props => (
          <TitleDropdown
            {...props}
            ref={node => {
              this.searchInput = node;
            }}
          />
        ),
        filterIcon: filtered => (
          <Icon type="search" className={classNames({ filtered })} />
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
        render: StockRender
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
          <ActionRender
            text={text}
            record={record}
            onUpdate={this.props.onUpdate}
            onDelete={this.props.onDelete}
            isCurrent={record.id === this.props.products.remove.current}
            isDeleting={this.props.products.remove.loading}
            textDelete="Are you sure to delete this product?"
          />
        )
      }
    ];
    return (
      <Table
        rowKey={rowKey}
        columns={columns}
        pagination={pagination}
        dataSource={dataSource}
        loading={loading}
        rowSelection={rowSelection}
        onChange={this.onChange}
        onRow={this.onRow}
      />
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(
  mapStateToProps,
  { getProducts }
)(TableProduct);
