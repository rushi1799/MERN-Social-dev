import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import PostItem from "../posts/PostItem";
import CommentFrom from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        BacK To Post
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentFrom postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} postId={post._id} comment={comment} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPost })(Post);
