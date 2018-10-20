import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount() {
    this.fetchTopRepos();
  }

  fetchTopRepos() {
    fetch(`${document.URL}repos?category=size`)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      this.setState({
        repos: json
      })
    })
  }

  search (term) {
    fetch(`${document.URL}repos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: term})
    })
    .then((response) => {
      console.log(`${term} was searched`, response.status);
      this.fetchTopRepos();
    })
    .catch((err) => {
      console.log(`${term} was not searched`, err)
    })
  } 

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));