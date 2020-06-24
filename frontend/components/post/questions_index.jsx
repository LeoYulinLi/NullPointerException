import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getQuestionIndex } from "../../actions/post_actions";

const QuestionsIndex = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionIndex());
  }, []);

  const questionIndexSelector = state => Object.values(state.posts.questions)
  const questionIndex = useSelector(questionIndexSelector);
  const questionPostsSelector = state => state.posts.posts;
  const questionPosts = useSelector(questionPostsSelector);

  return <div>
    {questionIndex.map(i => <p>{JSON.stringify(i)}</p>)}
  </div>

}

export default QuestionsIndex;