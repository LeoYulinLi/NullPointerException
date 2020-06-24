import { useDispatch, useSelector } from "react-redux";
import { getQuestionThread } from "../../actions/post_actions";
import { useParams } from "react-router";
import React from "react";
import AnswerForm from "./answer_form";
import moment from "moment";
import { Link } from "react-router-dom";

const { useEffect } = require("react");

/**
 * @param {string} body
 * @param {User} author
 * @param {string} time
 */
const Post = ({ body, author, time }) => {
  return <div className="post">
    <div className="post-body">
      <div className="post-text">{ body }</div>
    </div>
    <div className="post-footer">
      <div className="post-menu">
        <a href="#">Edit</a>
      </div>
      <div className="post-signature">
        <span>{ moment(time).fromNow() }</span>
        <Link to={`/users/${author.id}`}>{ author.display_name }</Link>
      </div>
    </div>
  </div>
}

const Thread = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  /**
   * @param {RootState} state
   */
  const allPostsSelector = state => state.posts.post_currents ? Object.values(state.posts.post_currents) : [];

  /**
   * @type {PostCurrent[]}
   */
  const allPosts = useSelector(allPostsSelector);

  /**
   * @param {RootState} state
   */
  const usersSelector = state => state.users

  /**
   * @type {Object<number, {display_name: string, id: number, username: string}>}
   */
  const users = useSelector(usersSelector);

  useEffect(() => {
    dispatch(getQuestionThread(id));
  }, []);


  return <div className="thread">
    { allPosts.map(post => {
      const author = users[post.user_id];
      return <Post author={ author } body={ post.body } time={ post.created_at }/>
    }) }
    <AnswerForm id={ id }/>
  </div>

}

export default Thread;