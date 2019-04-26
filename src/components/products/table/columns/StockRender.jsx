import React from "react";
import { Badge } from "antd";

const StockRender = text => {
  let backgroundColor = "#f5222d";
  if (text > 100) {
    backgroundColor = "#52c41a";
  } else if (text >= 30 && text < 100) {
    backgroundColor = "#fa8c16";
  }

  return <Badge count={text} showZero style={{ backgroundColor }} />;
};

export default StockRender;
