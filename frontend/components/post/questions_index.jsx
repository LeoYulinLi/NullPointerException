import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getQuestionIndex } from "../../actions/post_actions";
import QuestionIndexItem from "./question_index_item";

const QuestionsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionIndex());
  }, []);


  const questionIndexSelector = state => Object.values(state.posts.questions);

  /**
   * @type {{question_id: number, post_id: number}[]}
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
    { questionIndex.map(({ question_id }) =>
      <QuestionIndexItem question_id={question_id} revision={getContentById(question_id)} />)
    }
  </div>

}

export default QuestionsIndex;