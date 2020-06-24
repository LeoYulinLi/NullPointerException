import { useDispatch, useSelector } from "react-redux";
import { getQuestionThread } from "../../actions/post_actions";
import { useParams } from "react-router";
import React from "react";

const { useEffect } = require("react");

const Thread = () => {

  const dispatch = useDispatch();

  const { id } = useParams();

  /**
   * @param {RootState} state
   */
  const allPostsSelector = state => Object.values(state.posts.posts);

  /**
   * @type {{post_id: number, revision_id: number}[]}
   */
  const allPosts = useSelector(allPostsSelector);

  /**
   * @param {RootState} state
   */
  const allRevisionsSelector = state => state.posts.revisions;

  /**
   * @type {Object<number, Revision>}
   */
  const allRevision = useSelector(allRevisionsSelector);

  useEffect(() => {
    dispatch(getQuestionThread(id));
  }, []);


  return <p>
    {JSON.stringify({ posts: allPosts, revisions: allRevision })}
  </p>

}

export default Thread;