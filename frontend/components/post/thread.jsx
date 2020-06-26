import { useDispatch, useSelector } from "react-redux";
import { getQuestionThread } from "../../actions/post_actions";
import { useParams } from "react-router";
import React from "react";
import AnswerForm from "./answer_form";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { uiLoadingSelector } from "../../selectors/selectors";
import { AskQuestionHeader } from "./widgets";

const { useEffect } = require("react");

/**
 * @param {string} body
 * @param {User} author
 * @param {string} time
 * @param {number} id
 * @param {number} question_id
 */
const Post = ({ body, author, time, id, question_id }) => {
  const actionWord = id.toString() === question_id.toString() ? 'asked' : 'answered'
  return <div className="post">
    <div className="post-body">
      <ReactMarkdown className="post-text" source={ body }/>
    </div>
    <div className="post-footer">
      <div className="post-menu">
        <Link to={ `/posts/${ id }/edit` }>edit</Link>
      </div>
      <div className="post-signature">
        <span>{ actionWord } { moment(time).fromNow() }</span>
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
    <AskQuestionHeader headerText={ allPosts[0]?.title }/>
    <div className="thread-statistic">
      <div className="stat-item" title={ allPosts[0]?.created_at }>
        <span className="stat-key">Asked</span>
        <time dateTime={ allPosts[0]?.created_at }>{ moment(allPosts[0]?.created_at).fromNow() }</time>
      </div>
      <div className="stat-item" title={ allPosts[0]?.created_at }>
        <span className="stat-key">Active</span>
        <time dateTime={ allPosts[0]?.created_at }>{ moment(allPosts[0]?.created_at).fromNow() }</time>
      </div>
    </div>
    { allPosts.map(post => {
      const author = users[post.user_id];
      return <Post
        key={ `post-${ post.post_id }` }
        author={ author }
        body={ post.body }
        time={ post.created_at }
        id={ post.post_id }
        question_id={ post.question_id }
      />
    }) }
    <AnswerForm id={ id }/>
  </div>

}

export default Thread;