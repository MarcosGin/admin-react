import React, { Fragment } from "react";
import { Button, Divider } from "antd";

const ActionRender = props => {
  const { record, onUpdate, onDelete } = props;

  // Alternative is using currying fn = (param) => (e) => {}
  const handleClick = action => e => {
    e.stopPropagation();

    return action === "edit" ? onUpdate(record) : onDelete(record);
  };

  return (
    <Fragment>
      <Button onClick={handleClick("edit")} icon="edit" size="small" />
      <Divider type="vertical" />
      <Button onClick={handleClick("delete")} icon="delete" size="small" />
    </Fragment>
  );
};

export default ActionRender;
