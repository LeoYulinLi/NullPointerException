import { useDispatch, useSelector } from "react-redux";
import { getQuestionThread } from "../../actions/post_actions";
import { useParams } from "react-router";
import React from "react";
import AnswerForm from "./answer_form";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { uiLoadingSelector } from "../../selectors/selectors";

const { useEffect } = require("react");

/**
 * @param {string} body
 * @param {User} author
 * @param {string} time
 * @param {number} id
 */
const Post = ({ body, author, time, id }) => {
  return <div className="post">
    <div className="post-body">
      <ReactMarkdown disallowedTypes={ ['image', 'imageReference'] } className="post-text" source={ body }/>
    </div>
    <div className="post-footer">
      <div className="post-menu">
        <Link to={ `/posts/${ id }/edit` }>Edit</Link>
      </div>
      <div className="post-signature">
        <span>{ moment(time).fromNow() }</span>
        <Link to={ `/users/${ author.id }` }>{ author.display_name }</Link>
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

  const loading = useSelector(uiLoadingSelector);

  useEffect(() => {
    dispatch(getQuestionThread(id));
  }, []);


  return !loading && <div className="thread">
    <h1>{ allPosts[0]?.title }</h1>
    { allPosts.map(post => {
      const author = users[post.user_id];
      return <Post
        key={`post-${post.post_id}`}
        author={ author }
        body={ post.body }
        time={ post.created_at }
        id={ post.post_id }
      />
    }) }
    <AnswerForm id={ id }/>
  </div>

}

export default Thread;