import React from 'react';
import RepoListItem from './RepoListItem.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
      {props.repos.map(repo => <RepoListItem repo={repo} key={repo.id} />)}
    </ul>
  </div>
)

export default RepoList;