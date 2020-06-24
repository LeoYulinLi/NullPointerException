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

  return <div>
    <Link to={ `/questions/${ question_id }` }>{ revision.title }</Link>
    <small>{ users[revision.user_id].display_name } asked { moment(revision.created_at).fromNow() }</small>
  </div>
}

export default QuestionIndexItem;