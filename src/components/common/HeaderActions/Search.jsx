import "./Search.css";

import React, { Component } from "react";
import { Icon, AutoComplete, Input } from "antd";
import classNames from "classnames";

class Search extends Component {
  state = {
    show: false,
    value: ""
  };

  handleChange = e => {
    console.log(e);
  };

  handleClick = e => {
    this.inputSearch.focus();
    this.setState({ show: true });
  };

  handleRemove = () => {
    this.setState({ show: false });
  };

  render() {
    const { show, value } = this.state;
    return (
      <span
        className={classNames("header-action search-input", { show })}
        onClick={this.handleClick}
      >
        <Icon type="search" key="Icon" />

        <AutoComplete
          dataSource={["Samsung J2 "]}
          className="input-container"
          value={value}
          onChange={this.handleChange}
        >
          <Input
            ref={node => (this.inputSearch = node)}
            aria-label="Search something"
            placeholder="Search something"
            onKeyDown={this.onKeyDown}
            onBlur={this.handleRemove}
          />
        </AutoComplete>
      </span>
    );
  }
}

export default Search;
