import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../actions/post_actions";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import { FormBodyEditor, LoadingButton } from "../widgets";

/**
 * @typedef EditPostForm
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {string} note
 */

/**
 * Edit Post Component
 */
const EditForm = () => {

  const { id } = useParams();

  const history = useHistory();

  /**
   * @param {RootState} state
   */
  const postSelector = state => state.posts.post_currents[id];

  /**
   * @type {PostCurrent}
   */
  const post = useSelector(postSelector);

  const [title, setTitle] = useState(post.title ? post.title : "");
  const [body, setBody] = useState(post.body ? post.body : "");
  const [note, setNote] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const unmounted = useRef(false);

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    dispatch(editPost({ id, title, body, note }))
      .then(() => {
        !unmounted.current && setSubmitting(false);
        history.push(`/questions/${ post.question_id }`)
      });
  }

  useEffect(() => {
    return () => {
      unmounted.current = true;
    }
  }, []);

  return <div className="post-page">
    <form onSubmit={ handleSubmit }>
      { post.is_question && <div className="form-group">
        <label htmlFor="title">
          <strong>Title</strong>
        </label>
        <input required id="title" type="text" value={ title } onChange={ event => setTitle(event.target.value) }
               disabled={ submitting }/>
      </div> }
      <FormBodyEditor body={ body } setBody={ setBody } rows={ 15 } labelTitle={ "Body" } disabled={ submitting }/>
      <div className="form-group">
        <label htmlFor="note">
          <strong>Edit Summary</strong>
        </label>
        <input
          required
          id="note"
          type="text"
          value={ note }
          onChange={ event => setNote(event.target.value) }
          placeholder="briefly explain your changes (corrected spelling, fixed grammar, improved formatting)"
          disabled={ submitting }
        />
      </div>
      <LoadingButton style="button-primary" loading={ submitting }>Submit</LoadingButton>
    </form>
  </div>
};

export default EditForm;