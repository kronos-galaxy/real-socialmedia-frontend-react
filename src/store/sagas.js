import { all } from 'redux-saga/effects'
import auth from 'store/ducks/auth/saga'
import camera from 'store/ducks/camera/saga'
import theme from 'store/ducks/theme/saga'
import posts from 'store/ducks/posts/saga'
import albums from 'store/ducks/albums/saga'
import users from 'store/ducks/users/saga'
import layout from 'store/ducks/layout/saga'
import translation from 'store/ducks/translation/saga'
import cache from 'store/ducks/cache/saga'

export default function* rootSaga(persistor) {
  yield all([]
    .concat(auth(persistor))
    .concat(camera())
    .concat(theme())
    .concat(posts())
    .concat(albums())
    .concat(users())
    .concat(layout())
    .concat(translation())
    .concat(cache())
  )
}
