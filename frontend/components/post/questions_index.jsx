import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getQuestionIndex } from "../../actions/post_actions";
import QuestionIndexItem from "./question_index_item";
import { Link } from "react-router-dom";
import { AskQuestionHeader } from "./widgets";

const QuestionsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionIndex());
  }, []);


  const questionIndexSelector = state => state.posts.questions ? Object.values(state.posts.questions) : [];

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
  return <div className="question-list">
    <AskQuestionHeader headerText={"All Questions"} />
    { questionIndex.map(({ post_id, question_id }) =>
      <QuestionIndexItem
        key={`question-${question_id}`}
        question_id={question_id}
        revision={getContentById(post_id)}
      />)
    }
  </div>

}

export default QuestionsIndex;