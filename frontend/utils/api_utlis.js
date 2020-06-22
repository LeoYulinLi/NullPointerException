
/**
 * @param {FormUser} user
 */
export function postSession(user) {
  return $.ajax({
    url: `/api/sessions`,
    method: 'POST',
    data: { user }
  });
}

/**
 *
 * @param {SignupFormUser} user
 */
export function postUser(user) {
  return $.ajax({
    url: `/api/users`,
    method: 'POST',
    data: { user }
  });
}
