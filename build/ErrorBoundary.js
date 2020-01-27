import React from "/web_modules/react.js";
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      ...errorInfo
    });
  }

  render() {
    return this.state.error ? React.createElement(React.Fragment, null, React.createElement("h1", null, "Something went wrong."), React.createElement("a", {
      href: "/"
    }, React.createElement("h2", null, "Click here to reload")), Object.entries(this.state).map(([key, value]) => React.createElement("div", {
      style: {
        outline: 'solid',
        padding: '10px'
      },
      key: key
    }, key, " is ", value.toString()))) : this.props.children;
  }

}