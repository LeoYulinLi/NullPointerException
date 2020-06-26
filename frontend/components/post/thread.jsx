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
import uniq from 'lodash.uniq';

const { useEffect } = require("react");

/**
 * @param {User[]} authors
 * @param {User} owner
 * @param {PostCurrent} post
 */
const Post = ({authors, owner, post }) => {
  const actionWord = post.is_question ? 'asked' : 'answered'
  const { post_id, body, created_at: time } = post
  return <div className="post">
    <div className="post-body">
      <ReactMarkdown className="post-text" source={ body }/>
    </div>
    <div className="post-footer">
      <div className="post-menu">
        <Link to={ `/posts/${ post_id }/edit` }>edit</Link>
      </div>
      <div className="post-signature">
        <span>{ actionWord } { moment(time).fromNow() }</span>
        <Link to={ `/users/${ owner.id }` }>{ owner.display_name }</Link>
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
      const authors = uniq(post.author_ids).map(id => users[id]);
      const owner = authors.shift();
      return <Post
        key={ `post-${ post.post_id }` }
        owner = { owner }
        authors={ authors }
        post={ post }
      />
    }) }
    <AnswerForm id={ id }/>
  </div>

}

export default Thread;