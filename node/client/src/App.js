import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  state = {graphs : [], userId : "Jeff",
      data: [],
      trace : { x:[1,2,3], y:[1,2,3]}, type: 'scatter',
      mode: 'lines+points',
      marker: {color: 'red'},
      layout:{showlegend:true, legend: {
          x: .5,
            y: 1.25}}};

  constructor(props) {
      super(props);
      this.state.data.push(this.state.trace);
  }
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