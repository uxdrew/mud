import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  state = {graphs : [], userId : "alec"};

  componentDidMount() {
    fetch('/graph?user=' + this.state.userId)
      .then(res => res.json())
      .then(graphs => this.setState({ graphs }));
  }

  render() {
    return (
      <body className="App">

        {this.state.graphs.map(graph =>
              <Plot
                  data={graph.data}
                  layout={graph.layout}
              />
        )}
      </body>
    );
  }



}

export default App;