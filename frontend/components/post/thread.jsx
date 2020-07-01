import { useDispatch, useSelector } from "react-redux";
import { getQuestionThread } from "../../actions/post_actions";
import { useHistory, useParams } from "react-router";
import React, { useState } from "react";
import AnswerForm from "./answer_form";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { uiLoadingSelector, userIdSelector } from "../../selectors/selectors";
import { AskQuestionHeader, Loading, Modal, Popup } from "../widgets";
import { deletePost, deleteVote, postVoteDown, postVoteUp } from "../../utils/api_utlis";
import Login from "../session/login";
import ErrorAlert from "../error/error_alert";
import VoteBox from "./vote_box";

const { useEffect } = require("react");

/**
 * @param {PostCurrent} post
 * @param {number} ownerId
 */
const Post = ({ post, ownerId }) => {

  const actionWord = post.is_question ? 'asked' : 'answered';

  const history = useHistory();

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);

  const handleDeletePost = (event) => {
    event.preventDefault();
    deletePost(post.post_id)
      .then(() => {
        if (post.is_question) {
          history.push('/');
        } else {
          dispatch(getQuestionThread(post.question_id));
        }
      }, errors => {
        setErrors(errors.responseJSON);
      });
  }

  /**
   * @param {RootState} state
   */
  const usersSelector = state => state.users

  /**
   * @type {Object<number, {display_name: string, id: number, username: string}>}
   */
  const users = useSelector(usersSelector);

  const currentUserId = useSelector(userIdSelector);

  const author = users[post.create.user_id]

  const editor = users[post.update?.user_id]

  // TODO: this is just to fixed the voted state. see if there is a more efficient way
  useEffect(() => {
    dispatch(getQuestionThread(post.question_id));
  }, [currentUserId]);

  const { post_id, body } = post

  return <div className="post">
    <div className="post-left">
      <VoteBox post={ post } setErrors={ setErrors }/>
    </div>
    <div className="post-right">
      <div className="post-body">
        <ReactMarkdown className="post-text" source={ body }/>
      </div>
      <ErrorAlert errors={ errors }/>
      <div className="post-footer">
        <div className="post-menu">
          <Link to={ `/posts/${ post_id }/edit` }>
            { currentUserId ? "edit" : "improve this question" }
          </Link>
          { currentUserId === post.create.user_id && <a href="#" onClick={ handleDeletePost }>delete</a> }
        </div>
        <div className="signatures">
          { post.update && <div className={ `signature${ editor && editor.id === ownerId ? " owner" : "" }` }>
            <span className="time">edited { moment(post.update.at).fromNow() }</span>
            { editor && <Link to={ `/users/${ editor.id }` }>{ editor.display_name }</Link> }
          </div> }
          <div className={ `signature${ author.id === ownerId ? " owner" : "" }` }>
            <span className="time">{ actionWord } { moment(post.create.at).fromNow() }</span>
            <Link to={ `/users/${ author.id }` }>{ author.display_name }</Link>
          </div>
        </div>
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

  const loading = useSelector(uiLoadingSelector);

  useEffect(() => {
    dispatch(getQuestionThread(id));
  }, []);

  const question = allPosts[0]


  const ownerId = question?.create?.user_id

  const createTime = question?.create.at
  const updateTime = (question?.update ? question?.update : question?.create)?.at

  return <Loading loadingCondition={ !question }>
    <div className="thread">
      <AskQuestionHeader headerText={ allPosts[0]?.title }/>
      <div className="thread-statistic">
        <div className="stat-item" title={ createTime }>
          <span className="stat-key">Asked</span>
          <time dateTime={ createTime }>{ moment(createTime).fromNow() }</time>
        </div>
        <div className="stat-item" title={ updateTime }>
          <span className="stat-key">Active</span>
          <time dateTime={ updateTime }>{ moment(updateTime).fromNow() }</time>
        </div>
      </div>
      { allPosts.map(post => {
        return <Post
          key={ `post-${ post.post_id }` }
          post={ post }
          ownerId={ ownerId }
        />
      }) }
      <AnswerForm id={ id }/>
    </div>
  </Loading>

}

export default Thread;