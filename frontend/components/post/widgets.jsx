import React from "react";
import ReactMarkdown from "react-markdown";

export const EditorHint = () => <div className="editor-hint">
  <span>```<code>code</code>```</span>
  <span>**<strong>bold</strong>**</span>
  <span>*<em>italic</em>*</span>
  <span>>quote</span>
</div>

/**
 *
 * @param {string} body
 * @param {Dispatch<SetStateAction<string>>} setBody
 * @param {number} rows
 * @param {string} [labelTitle]
 * @param {string} [hint]
 * @param {*} children
 */
export const FormBodyEditor = ({ body, setBody, rows, labelTitle, hint, children }) => {
  return <div className="form-group">
    { (labelTitle || hint) && <label htmlFor="body">
      { labelTitle && <strong>{ labelTitle }</strong> }
      { hint && <small className="hint">{ hint }</small> }
    </label> }
    <textarea required rows={ rows } id="body" value={ body } onChange={ event => setBody(event.target.value) }/>
    { children }
    <ReactMarkdown className="post-text" source={ body }/>
  </div>
}