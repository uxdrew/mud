import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  state = {graphs : [], userId : "alec",
      layout:{  hovermode: false,
                showlegend:false,
                // yaxis : {
                //     mode: "linear"
                // }
      }};

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
              <ul>
                  <li>Happy: {graph.count.happy}</li>
                  <li>Sad: {graph.count.sad}</li>
                  <li>Neutral: {graph.count.neutral}</li>
              </ul>
              <Plot
                  data={graph.data}
                  layout={graph.layout}
              />
            </div>
        )}
      </div>
    );
  }



}

export default App;