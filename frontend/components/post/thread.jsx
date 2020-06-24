import { useDispatch, useSelector } from "react-redux";
import { getQuestionThread } from "../../actions/post_actions";
import { useParams } from "react-router";
import React from "react";
import AnswerForm from "./answer_form";

const { useEffect } = require("react");

const Thread = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  /**
   * @param {RootState} state
   */
  const allPostsSelector = state => state.posts.post_currents ? Object.values(state.posts.post_currents) : [];

  /**
   * @type {PostCurrent[]}
   */
  const allPosts = useSelector(allPostsSelector);

  /**
   * @param {RootState} state
   */
  const usersSelector = state => state.users

  /**
   * @type {Object<number, {display_name: string, id: number, username: string}>}
   */
  const users = useSelector(usersSelector);

  useEffect(() => {
    dispatch(getQuestionThread(id));
  }, []);


  return <div>
    <p>
      {JSON.stringify({ posts: allPosts, users: users })}
    </p>
    <AnswerForm id={id} />
  </div>

}

export default Thread;