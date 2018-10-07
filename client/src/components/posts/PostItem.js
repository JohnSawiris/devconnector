import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike
} from "../../redux/actions/postActions";

class PostItem extends Component {
  static defaultProps = {
    showActions: true
  };

  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  onDeleteClick = postId => {
    this.props.deletePost(postId);
  };

  onLikeClick = postId => {
    this.props.addLike(postId);
  };

  onUnlikeClick = postId => {
    this.props.removeLike(postId);
  };

  findUserLike = likes => {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${post.name}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => {
                    this.onLikeClick(post._id);
                  }}
                >
                  <i
                    className={classnames("fa fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => {
                    this.onUnlikeClick(post._id);
                  }}
                >
                  <i className="text-secondary fa fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={() => {
                      this.onDeleteClick(post._id);
                    }}
                  >
                    <i className="fa fa-times" />
                  </button>
                ) : null}
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
