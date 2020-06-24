
export const isLoggedInSelector = state => !!state.session.user_id

export const userIdSelector = state => state.session.user_id