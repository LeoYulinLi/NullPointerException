import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { askQuestion } from "../../actions/post_actions";
import ReactMarkdown from "react-markdown";
import { EditorHint } from "./widgets";

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

  useEffect(() => {
    const $root = $('#root');
    $root.addClass("ask-page");
    return () => $root.removeClass("ask-page");
  }, [])

  return <div className="post-page">
    <h1>Ask a public question</h1>
    <form onSubmit={handleSubmit}>
      <div className="ask-form-content">
        <div className="form-group">
          <label htmlFor="title">
            <strong>Title</strong>
            <small>Be specific and imagine you’re asking a question to another person</small>
          </label>
          <input required id="title" type="text" value={ title } onChange={ event => setTitle(event.target.value) }/>
        </div>
        <div className="form-group">
          <label htmlFor="body">
            <strong>Body</strong>
            <small>Include all the information someone would need to answer your question</small>
          </label>
          <textarea required id="body" value={ body } onChange={ event => setBody(event.target.value) }/>
          <EditorHint />
        </div>
        <ReactMarkdown source={body} />
      </div>
      <button className="button button-primary">Submit</button>
    </form>
  </div>
};

export default AskForm;