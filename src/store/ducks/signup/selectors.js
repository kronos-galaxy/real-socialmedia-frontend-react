import prop from 'ramda/src/prop'
import compose from 'ramda/src/compose'

const signupRoot = prop('signup')
export const signupCreate = compose(prop('signupCreate'), signupRoot)
export const signupConfirm = compose(prop('signupConfirm'), signupRoot)