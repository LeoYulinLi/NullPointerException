import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

/**
 * @param {QuestionSummary} question
 * @param {Revision} revision
 */
const QuestionIndexItem = ({ question, revision }) => {

  /**
   * @param {RootState} state
   */
  const usersSelector = state => state.users;

  /**
   * @type {UserState}
   */
  const users = useSelector(usersSelector);

  const history = useHistory();

  return <div className="question-item">
    <div className="question-item-stats" onClick={ () => history.push(`/questions/${ question.question_id }`) }>
      <div className="stat-item">
        <span className="count">{ question.vote_count }</span>
        <span className="counter">vote</span>
      </div>
      <div className={ `stat-item${ question.answer_count > 0 ? " answered" : "" }` }>
        <span className="count">{ question.answer_count }</span>
        <span className="counter">answer</span>
      </div>
    </div>
    <div className="question-item-summary">
      <h2><Link to={ `/questions/${ question.question_id }` }>{ revision.title }</Link></h2>
      <div className="info">
        <div className="tags">
          <ul>
            <li>PlaceHolder</li>
            <li>PlaceHolder</li>
          </ul>
        </div>
        <small>
          <Link to={ `/questions/${ question.question_id }` } className="action" >
            { question.edited ? 'modified' : 'asked' } { moment(revision.created_at).fromNow() }
          </Link>
          <Link to={ `/users/${ revision.user_id }` }>
            { users[revision.user_id].display_name }
          </Link>
        </small>
      </div>
    </div>
  </div>
}

export default QuestionIndexItem;