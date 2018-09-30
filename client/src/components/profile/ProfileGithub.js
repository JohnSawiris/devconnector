import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  state = {
    clientId: "0976cef7e1f428a3df98",
    clientSecret: "353ec424737f9b0b866942f4ceb1ef51ecad7a7e",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  static propTypes = {
    username: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers}
            </span>
            <span className="badge badge-success">Forks: {repo.forks}</span>
          </div>
        </div>
      </div>
    ));
    return (
      <React.Fragment>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </React.Fragment>
    );
  }
}

export default ProfileGithub;
