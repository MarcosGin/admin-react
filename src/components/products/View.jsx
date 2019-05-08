import "./View.css";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Drawer, Spin, Row, Col, Divider, Button } from "antd";
import Currency from "react-currency-formatter";

import { setUpdateForm, clearDrawer } from "../../actions";

import TextArea from "../common/TextArea/TextArea";

const ViewItem = ({ label, content }) => (
  <div className="view-item">
    <p>{label}:</p>
    {content}
  </div>
);
class View extends Component {
  onUpdate = () => {
    this.props.handleModalUpdate(true);
    this.props.setUpdateForm(this.props.products.view.current);
  };

  render() {
    const {
      drawerVisible,
      handleDrawerVisible,
      products: { view },
      clearDrawer
    } = this.props;

    const getContent = () => {
      if (view.error) {
        handleDrawerVisible();
        clearDrawer();
        return null;
      }
      if (view.current === null) {
        return null;
      }

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
        <Spin spinning={view.loading} style={{ width: "100%", height: "100%" }}>
          {getContent()}
        </Spin>

        <div className="drawer-bottom">
          <Button onClick={this.onUpdate} type="primary">
            Edit
          </Button>
        </div>
      </Drawer>
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
  { setUpdateForm, clearDrawer }
)(View);
