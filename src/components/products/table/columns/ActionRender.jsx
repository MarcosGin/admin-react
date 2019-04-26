import React, { Fragment } from "react";
import { Button, Divider } from "antd";

const ActionRender = props => {
  const { record, onClick } = props;

  // Alternative is using currying fn = (param) => (e) => {}
  const handleClick = e => {
    e.stopPropagation();
    onClick(record);
  };

  return (
    <Fragment>
      <Button onClick={handleClick} icon="edit" size="small" />
      <Divider type="vertical" />
      <Button onClick={handleClick} icon="delete" size="small" />
    </Fragment>
  );
};

export default ActionRender;
