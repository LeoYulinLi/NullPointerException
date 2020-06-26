import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getQuestionIndex } from "../../actions/post_actions";
import QuestionIndexItem from "./question_index_item";
import { AskQuestionHeader } from "./widgets";
import orderBy from  'lodash.orderby';

const QuestionsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionIndex());
  }, []);

  /**
   * @param {RootState} state
   */
  const questionsSelector = state => state.posts.questions;

  /**
   * @type {Object<number, QuestionSummary>}
   */
  const questions = useSelector(questionsSelector);

  return <div className="question-list">
    <AskQuestionHeader headerText={ "All Questions" }/>
    { orderBy(questions, ['question_id'], ['desc']).map((question) =>
      <QuestionIndexItem
        key={ `question-${ question.question_id }` }
        question={ question }
      />)
    }
  </div>

}

export default QuestionsIndex;