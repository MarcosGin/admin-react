import React, { Fragment } from "react";
import { Button, Divider, Popconfirm, Icon } from "antd";

const ActionRender = props => {
  const {
    record,
    onUpdate,
    onDelete,
    textDelete,
    isDeleting,
    isCurrent
  } = props;

  const handleClick = action => e => {
    e.stopPropagation();

    return action === "edit" ? onUpdate(record) : onDelete(record);
  };

  const getDeleteButton = () => {
    if (isDeleting) {
      return (
        <Button
          icon="delete"
          size="small"
          loading={isCurrent}
          disabled={!isCurrent}
        />
      );
    }

    return (
      <Popconfirm
        onConfirm={handleClick("delete")}
        onCancel={e => e.stopPropagation()}
        title={textDelete}
        okType="danger"
        okText="Delete"
        placement="left"
        icon={<Icon type="warning" style={{ color: "red" }} />}
      >
        <Button icon="delete" size="small" onClick={e => e.stopPropagation()} />
      </Popconfirm>
    );
  };

  return (
    <Fragment>
      <Button onClick={handleClick("edit")} icon="edit" size="small" />
      <Divider type="vertical" />
      {getDeleteButton()}
    </Fragment>
  );
};

export default ActionRender;
