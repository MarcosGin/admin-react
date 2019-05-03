import "react-quill/dist/quill.snow.css";
import "./TextArea.css";

import React, { Component } from "react";
import ReactQuill from "react-quill";
import classNames from "classnames";

// Todo: maybe we have to validate the exact amount of strings, we could use a character callback from the textarea component
// Todo: use a react-perfect-scrollbar for create a beautiful scroll
class TextArea extends Component {
  state = {
    focused: false
  };

  onFocus = () => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };
  onBlur = () => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  render() {
    const classes = classNames("textarea-custom", {
      focus: this.state.focused,
      hasError: this.props.hasError
    });
    return (
      <ReactQuill
        {...this.props}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        className={classes}
      />
    );
  }
}

export default TextArea;
