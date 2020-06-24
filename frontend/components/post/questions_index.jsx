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
  const revisionSelector = state => state.posts.revisions
  const revisions = useSelector(revisionSelector)

  return <div>
    {questionIndex.map(i => <p>
      {revisions[questionPosts[i.question_id].revision_id].title}
    </p>)}
  </div>

}

export default QuestionsIndex;