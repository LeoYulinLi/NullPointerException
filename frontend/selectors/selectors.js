
export const isLoggedInSelector = state => !!state.session.user_id;

export const userIdSelector = state => state.session.user_id;

export const uiLoadingSelector = state => state.ui.loading;


/**
 * @param {RootState} state
 */
export const postErrorSelector = state => state.errors.post;
