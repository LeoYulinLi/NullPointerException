import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getQuestionIndex } from "../../actions/post_actions";

const QuestionsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionIndex());
  }, []);


  const questionIndexSelector = state => state.posts.questions;

  /**
   * @type {Object<number, {question_id: number, post_id: number}>}
   */
  const questionIndex = useSelector(questionIndexSelector);

  const questionPostsSelector = state => state.posts.posts;

  /**
   * @type {Object<number, {post_id: number, revision_id: number}>}
   */
  const questionPosts = useSelector(questionPostsSelector);

  const revisionSelector = state => state.posts.revisions;

  /**
   * @type {Object<number, Revision>}
   */
  const revisions = useSelector(revisionSelector);

  /**
   * @param {number} id
   */
  function getContentById(id) {
    return revisions[questionPosts[id].revision_id]
  }

  return <div>
    { questionIndex.map(({ question_id }) => <>
      <p>{ getContentById(question_id).title }</p>
      <p>{ getContentById(question_id).created_at }</p>
    </>) }
  </div>

}

export default QuestionsIndex;