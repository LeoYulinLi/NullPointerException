import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const EditorHint = () => <div className="editor-hint">
  <span>```<code>code</code>```</span>
  <span>**<strong>bold</strong>**</span>
  <span>*<em>italic</em>*</span>
  <span>>quote</span>
</div>

/**
 * @param {string} body
 * @param {Dispatch<SetStateAction<string>>} setBody
 * @param {number} rows
 * @param {string} [labelTitle]
 * @param {string} [hint]
 * @param {boolean} disabled
 * @param {*} children
 */
export const FormBodyEditor = ({ body, setBody, rows, labelTitle, hint, children, disabled }) => {
  return <div className="form-group">
    { (labelTitle || hint) && <label htmlFor="body">
      { labelTitle && <strong>{ labelTitle }</strong> }
      { hint && <small className="hint">{ hint }</small> }
    </label> }
    <textarea disabled={ disabled } required rows={ rows } id="body" value={ body }
              onChange={ event => setBody(event.target.value) }/>
    { children }
    <ReactMarkdown className="post-text" source={ body }/>
  </div>
}

export const AskQuestionHeader = ({ headerText }) => {
  return <div className="ask-question-header">
    <h1>{ headerText }</h1>
    <Link to="/ask" className="button button-primary">Ask Question</Link>
  </div>
}

export const Loading = ({ children, loadingCondition = null }) => {

  /**
   * @param {RootState} state
   */
  const loadingSelector = state => state.ui.loading;

  const isLoading = useSelector(loadingSelector);

  /**
   * use loadingCondition if there is one, otherwise, use the ui state
   */
  const condition = loadingCondition === null ? isLoading : loadingCondition

  return condition ? <div className="loading-ring"/> : children

}

export const LoadingButton = ({children, loading, style = "button-primary"}) => {
  return <button className={ `button ${style}` } disabled={ loading }>
    { loading ? <div className="loading-ring-small" /> : children }
  </button>
}

export const Modal = ({ children, header, show, setShow }) => {

  const handleClose = (event) => {
    event.preventDefault();
    setShow(false);
  }

  const handleClickAnyWhere = (event) => {
    event.preventDefault();
    if (event.target !== event.currentTarget) return;
    setShow(false);
  }

  return show ? <div className="modal-background" onClick={ handleClickAnyWhere }>
    <div className="modal">
      <div className="modal-header">
        <h1>{ header }</h1>
        <a className="modal-close" href="#" onClick={ handleClose }><i className="fas fa-times"/></a>
      </div>
      <div className="modal-body">
        { children }
      </div>
    </div>
  </div> : null
}

export const Popup = ({ children, showUntil = () => true, timeOut = 3000, style = "danger" }) => {

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, timeOut);
    return () => {
      clearTimeout(timer);
    }
  }, [children]);

  return show ? <div className={ `alert ${ style } popup` }>
    { children }
  </div> : null;
}