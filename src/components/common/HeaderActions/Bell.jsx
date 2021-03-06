import "./Bell.css";
import React, { Component, Fragment, Children } from "react";
import { Dropdown, Badge, Tabs, Spin, Icon } from "antd";
import List from "./List";

const { TabPane } = Tabs;

class Bell extends Component {
  static Tab = TabPane;

  onItemClick = item => {
    this.props.onItemClick(item);
  };

  getBox() {
    const { children, loading } = this.props;

    if (!children) {
      return null;
    }

    const panes = Children.map(children, child => {
      const {
        title,
        data,
        count,
        showClear,
        showViewMore,
        emptyImage,
        emptyText
      } = child.props;
      const len = count.length;
      const tabTitle = len > 0 ? `${title} (${len})` : title;

      return (
        <TabPane tab={tabTitle} key={title}>
          <List
            data={data}
            onClick={this.onItemClick}
            showViewMore={showViewMore}
            showClear={showClear}
            emptyImage={emptyImage}
            emptyText={emptyText}
          />
        </TabPane>
      );
    });
    return (
      <Fragment>
        <Spin spinning={loading}>
          <Tabs className="tabsList">{panes}</Tabs>
        </Spin>
      </Fragment>
    );
  }

  render() {
    const { onPopupVisibleChange } = this.props;
    // Todo: get count bell notifications from redux
    const trigger = (
      <span className="header-action">
        <Badge count={0} className="badge-bell">
          <Icon type="bell" className="icon-bell" />
        </Badge>
      </span>
    );

    if (!this.getBox()) {
      return trigger;
    }
    return (
      <Dropdown
        trigger={["click"]}
        overlay={this.getBox()}
        overlayClassName="header-dropdown-tabsList"
        onVisibleChange={onPopupVisibleChange}
      >
        {trigger}
      </Dropdown>
    );
  }
}

export default Bell;
