import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRepos } from "../../actions/profile";
const ProfileGitRepos = ({ getRepos, username, repos, loading }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);
  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>
      {repos !== [] &&
        repos.map((repo) => (
          <div class="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li class="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li class="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

ProfileGitRepos.propTypes = {
  getRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getRepos })(ProfileGitRepos);
