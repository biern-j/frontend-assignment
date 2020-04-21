import React from "react";
import ReactDOM from "react-dom";

type State = {};
class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    return <div>Hello</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
