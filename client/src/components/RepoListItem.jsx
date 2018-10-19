import React from 'react';

var RepoListItem = ({repo}) => (
  <li>
    <a href={repo.htmlUrl}>{repo.name}</a>
  </li>
)

export default RepoListItem;