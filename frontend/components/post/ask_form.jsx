import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../../actions/post_actions";
import ReactMarkdown from "react-markdown";
import { EditorHint, FormBodyEditor } from "../widgets";
import { useHistory } from "react-router";

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

  const history = useHistory();

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(askQuestion({ title, body }))
      .then(() => history.push('/'));
  }

  useLayoutEffect(() => {
    const $root = $('#root');
    $root.addClass("dim-background");
    return () => $root.removeClass("dim-background");
  }, [])

  return <div className="post-page">
    <h1>Ask a public question</h1>
    <form onSubmit={ handleSubmit }>
      <div className="ask-form-content">
        <div className="form-group">
          <label htmlFor="title">
            <strong>Title</strong>
            <small className="hint">Be specific and imagine you’re asking a question to another person</small>
          </label>
          <input
            required
            id="title"
            type="text"
            value={ title }
            onChange={ event => setTitle(event.target.value) }
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
        </div>
        <FormBodyEditor
          body={ body }
          setBody={ setBody }
          rows={ 15 }
          labelTitle={ "Body" }
          hint={ "Include all the information someone would need to answer your question" }>
          <EditorHint/>
        </FormBodyEditor>
      </div>
      <button className="button button-primary">Submit</button>
    </form>
  </div>
};

export default AskForm;