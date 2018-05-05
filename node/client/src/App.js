import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

class App extends Component {
  state = {graphs : [], userId : "alec",
      data: [],
      trace : { x:[1,2,3], y:[1,2,3]}, type: 'scatter',
      mode: 'lines+points',
      marker: {color: 'red'},
      layout:{width: 320, height: 240, title: 'A Fancy Plot'}};

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
                <iframe  width="900" height="800" frameBorder="0" scrolling="no" src={graph.url}></iframe>

                <Plot
                    data={this.state.data}
                    layout={this.state.layout}
                />
            </div>
        )}
      </div>
    );
  }



}

export default App;