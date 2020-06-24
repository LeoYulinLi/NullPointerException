import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { askQuestion } from "../../actions/post_actions";

/**
 * @typedef AskForm
 * @property {string} title
 * @property {string} body
 */

/**
 * @typedef EditQuestionForm
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {string} note
 */

/**
 * Ask Question Component
 */
const AskForm = () => {

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(askQuestion({ title, body }));
  }

  return <div className="post-page">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">
          <strong>Title</strong>
          <small>Be specific and imagine you’re asking a question to another person</small>
        </label>
        <input id="title" type="text" value={ title } onChange={ event => setTitle(event.target.value) }/>
      </div>
      <div className="form-group">
        <label htmlFor="body">
          <strong>Body</strong>
          <small>Include all the information someone would need to answer your question</small>
        </label>
        <textarea id="body" value={ body } onChange={ event => setBody(event.target.value) }/>
      </div>
      <button className="button button-primary">Submit</button>
    </form>
  </div>
};

export default AskForm;