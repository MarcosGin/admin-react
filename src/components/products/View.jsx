import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Drawer, Spin, Row, Col, Divider } from "antd";
import Currency from "react-currency-formatter";

import TextArea from "../common/TextArea/TextArea";
const ViewItem = ({ label, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: "22px",
      marginBottom: 7,
      color: "rgba(0,0,0,0.65)"
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: "inline-block",
        color: "rgba(0,0,0,0.95)"
      }}
    >
      {label}:
    </p>
    {content}
  </div>
);
class View extends Component {
  render() {
    const {
      drawerVisible,
      handleDrawerVisible,
      products: { view }
    } = this.props;

    if (view.current === null) {
      return null;
    }

    const getContent = () => {
      return (
        <Fragment>
          <Row>
            <Col span={24}>
              <ViewItem label="Title" content={view.current.title} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ViewItem label="Brand" content={view.current.mark.name} />
            </Col>
            <Col span={12}>
              <ViewItem label="Category" content={view.current.category.name} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <ViewItem
                label="Price"
                content={
                  <Currency
                    quantity={view.current.price}
                    decimal=","
                    group="."
                  />
                }
              />
            </Col>
            <Col span={12}>
              <ViewItem label="Stock" content={view.current.stock} />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <ViewItem label="Created at" content={view.current.createdAt} />
            </Col>
            <Col span={12}>
              <ViewItem label="Last update" content={view.current.updatedAt} />
            </Col>
          </Row>
          <Divider />

          <TextArea readOnly={true} value={view.current.description} />
        </Fragment>
      );
    };

    return (
      <Drawer
        width={720}
        title="Viewing product"
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
      >
        <Spin spinning={view.loading}>{getContent()}</Spin>
      </Drawer>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(View);
