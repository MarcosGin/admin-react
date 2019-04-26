import React from "react";
import { Input, Button } from "antd";

const TitleDropdown = React.forwardRef(
  ({ setSelectedKeys, selectedKeys, confirm, clearFilters }, ref) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={ref}
        placeholder={`Search by title`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
      <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  )
);

export default TitleDropdown;
