import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../redux/actions/postActions";

export class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  static propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: ""
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // Get user
    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    // Clear
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <button type="submit" className="btn btn-dark btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
