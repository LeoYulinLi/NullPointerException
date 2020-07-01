import { deleteVote, postVoteDown, postVoteUp } from "../../utils/api_utlis";
import React, { useState } from "react";
import { getQuestionThread } from "../../actions/post_actions";
import { useDispatch } from "react-redux";
import { Modal } from "../widgets";
import { Link } from "react-router-dom";

/**
 * @param {PostCurrent} post
 * @param setErrors
 */
const VoteBox = ({ post, setErrors }) => {

  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  /**
   * @param {postVoteUp | postVoteDown}action
   */
  const voteHandler = (action) => {
    return (event) => {
      event.preventDefault();
      if (submitting) return;
      setSubmitting(true);
      let finalAction = action;
      if (action === postVoteUp && post.votes.voted === 'up') finalAction = deleteVote
      if (action === postVoteDown && post.votes.voted === 'down') finalAction = deleteVote
      finalAction(post.post_id)
        .then(() => {
          setSubmitting(false);
          dispatch(getQuestionThread(post.question_id));
        }, errors => {
          setSubmitting(false);
          if (errors.status === 401) {
            setShowModal(true);
          } else {
            setErrors(errors.responseJSON)
          }
        });
    }
  };

  const [showModal, setShowModal] = useState(false);

  return <>
    <Modal header="Join the Null Pointer Exception Community" show={ showModal } setShow={ setShowModal }>
      <p>You need to <Link className="text-primary" to='/login'>log in</Link> before you vote</p>
      <Link to="/signup" className="button button-primary text-center">Sign up using email</Link>
    </Modal>
    <div className="vote-box">
      <a href="#" onClick={ voteHandler(postVoteUp) } className={ post.votes.voted === 'up' ? 'voted' : "" }>
        <i className="fas fa-chevron-up"/>
      </a>
      <span className="score">{ submitting ? <div className="loading-ring-small voting" /> : post.votes.score }</span>
      <a href="#" onClick={ voteHandler(postVoteDown) } className={ post.votes.voted === 'down' ? 'voted' : "" }>
        <i className="fas fa-chevron-down"/>
      </a>
    </div>
  </>
}

export default VoteBox;