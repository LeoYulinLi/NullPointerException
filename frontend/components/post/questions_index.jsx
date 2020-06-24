import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getQuestionIndex } from "../../actions/post_actions";

const QuestionsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionIndex());
  }, []);


  /**
   * @param {RootState} state
   */
  const questionIndexSelector = state => state.posts.questions
  const questionIndex = useSelector(questionIndexSelector);
  const questionPostsSelector = state => state.posts.posts;
  const questionPosts = useSelector(questionPostsSelector);
  const revisionSelector = state => state.posts.revisions
  const revisions = useSelector(revisionSelector)

  /**
   * @param {number} id
   * @returns {Revision}
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