import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {graphs : [], userId : "alec"};

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
            </div>
        )}
      </div>
    );
  }



}

export default App;