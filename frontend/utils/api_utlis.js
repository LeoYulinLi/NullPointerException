
/**
 * @param {FormUser} user
 */
export function postSession(user) {
  return $.ajax({
    url: `/api/session`,
    method: 'POST',
    data: { user }
  });
}

/**
 * @param {SignupFormUser} user
 */
export function postUser(user) {
  return $.ajax({
    url: `/api/users`,
    method: 'POST',
    data: { user }
  });
}

export function deleteSessionCurrent() {
  return $.ajax({
    url: `/api/session`, // TODO: just for now
    method: 'DELETE'
  });
}

export function getSession() {
  return $.ajax({
    url: `/api/session`
  });
}

/**
 * @param {AskForm} question
 */
export function postQuestion(question) {
  return $.ajax({
    url: `/api/questions`,
    method: 'POST',
    data: { question }
  });
}

export function getQuestions() {
  return $.ajax({
    url: `/api/questions`
  });
}

/**
 * @param {number} id
 */
export function getQuestion(id) {
  return $.ajax({
    url: `/api/questions/${id}`
  });
}

export function queryQuestion(query) {
  return $.ajax({
    url: `/api/questions?query=${query}`
  });
}

/**
 * @param {number} id
 * @param {{body: string}} post
 */
export function postQuestionAnswers(id, post) {
  return $.ajax({
    url: `/api/questions/${id}/answers`,
    method: 'POST',
    data: { post }
  })
}

/**
 * @param {EditPostForm} post
 */
export function patchPost(post) {
  return $.ajax({
    url: `/api/posts/${post.id}`,
    method: 'PATCH',
    data: { post }
  });
}

/**
 * @param {number} postId
 */
export function deletePost(postId) {
  return $.ajax({
    url: `/api/posts/${postId}`,
    method: 'DELETE'
  });
}

export function postVoteUp(postId) {
  return $.ajax({
    url: `/api/posts/${postId}/votes`,
    method: 'POST',
    data: {
      vote: {
        action: 'up'
      }
    }
  });
}

export function postVoteDown(postId) {
  return $.ajax({
    url: `/api/posts/${postId}/votes`,
    method: 'POST',
    data: {
      vote: {
        action: 'down'
      }
    }
  });
}

export function deleteVote(postId) {
  return $.ajax({
    url: `/api/posts/${postId}/vote`,
    method: 'DELETE'
  });
}