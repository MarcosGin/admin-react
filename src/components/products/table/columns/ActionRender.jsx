import React, { Fragment } from "react";
import { Button, Divider, Popconfirm, Icon } from "antd";

const ActionRender = props => {
  const { record, onUpdate, onDelete, textDelete } = props;

  const handleClick = action => e => {
    e.stopPropagation();

    return action === "edit" ? onUpdate(record) : onDelete(record);
  };

  return (
    <Fragment>
      <Button onClick={handleClick("edit")} icon="edit" size="small" />
      <Divider type="vertical" />
      <Popconfirm
        onConfirm={handleClick("delete")}
        title={textDelete}
        okType="danger"
        okText="Delete"
        placement="left"
        icon={<Icon type="warning" style={{ color: "red" }} />}
      >
        <Button icon="delete" size="small" />
      </Popconfirm>
    </Fragment>
  );
};

export default ActionRender;
