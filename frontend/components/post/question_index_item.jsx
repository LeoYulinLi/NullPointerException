import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

/**
 * @param {number} question_id
 * @param {Revision} revision
 */
const QuestionIndexItem = ({ question_id, revision }) => {

  /**
   * @param {RootState} state
   */
  const usersSelector = state => state.users;

  /**
   * @type {UserState}
   */
  const users = useSelector(usersSelector);

  return <div className="question-item">
    <h3><Link to={ `/questions/${ question_id }` }>{ revision.title }</Link></h3>
    <div className="info">
      <div className="tags">
        <ul>
          <li>PlaceHolder</li>
          <li>PlaceHolder</li>
        </ul>
      </div>
      <small>
        <Link to={ `/questions/${ question_id }` } >asked { moment(revision.created_at).fromNow() } </Link>
        <Link to={ `/users/${ revision.user_id }` }>{ users[revision.user_id].display_name }</Link>
      </small>
    </div>
  </div>
}

export default QuestionIndexItem;