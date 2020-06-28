import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../actions/post_actions";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import { FormBodyEditor } from "./widgets";

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

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(editPost({ id, title, body, note }))
      .then(() => history.push(`/questions/${ post.question_id }`));
  }

  return <div className="post-page">
    <form onSubmit={ handleSubmit }>
      { post.is_question && <div className="form-group">
        <label htmlFor="title">
          <strong>Title</strong>
        </label>
        <input required id="title" type="text" value={ title } onChange={ event => setTitle(event.target.value) }/>
      </div> }
      <FormBodyEditor body={body} setBody={setBody} rows={15} labelTitle={"Body"} />
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
        />
      </div>
      <button className="button button-primary">Submit</button>
    </form>
  </div>
};

export default EditForm;