
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

/**
 * @param {EditQuestionForm} question
 */
export function patchQuestion(question) {
  return $.ajax({
    url: `/api/questions/${question.id}`,
    method: 'PATCH',
    data: { question }
  })
}