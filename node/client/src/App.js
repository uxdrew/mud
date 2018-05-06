import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  state = {graphs : [], userId : "alec",
      layout:{ hovermode: false, showlegend:false}};

  componentDidMount() {
    fetch('/graph?user=' + this.state.userId)
      .then(res => res.json())
      .then(graphs => this.setState({ graphs }));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.userId}</h1>

        {this.state.graphs.map(graph =>

            <div>
                <Plot
                    data={graph.data}
                    layout={this.state.layout}
                />
            </div>
        )}
      </div>
    );
  }



}

export default App;