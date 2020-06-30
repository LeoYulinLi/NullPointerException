import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { queryQuestions, receiveQuery } from "../actions/post_actions";
import { AskQuestionHeader, Loading } from "./widgets";
import orderBy from "lodash.orderby";
import QuestionIndexItem from "./post/question_index_item";
import { useHistory, useParams } from "react-router";


const SearchResult = () => {

  const dispatch = useDispatch();

  /**
   * @param {RootState} state
   */
  const questionsSelector = state => state.posts.questions;

  /**
   * @type {Object<number, QuestionSummary>}
   */
  const questions = useSelector(questionsSelector);

  const { query } = useParams();

  const history = useHistory();

  useEffect(() => {
    if (query) {
      dispatch(queryQuestions(query));
    } else {
      history.push("/questions");
    }
  }, [query]);

  return <div className="question-list">
    <AskQuestionHeader headerText={ `Search Result: ${query}` }/>
    <Loading>
      { questions ? orderBy(questions, ['question_id'], ['desc']).map((question) =>
        <QuestionIndexItem
          key={ `question-${ question.question_id }` }
          question={ question }
        />) : <h1>No Result</h1>
      }
    </Loading>
  </div>

}

export default SearchResult;