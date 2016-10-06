import LoginConstants from './LoginConstants'
import LoginDispatcher from './LoginDispatcher'
import _ from 'lodash'

class LoginActions {
    static doLoginRequest(payload) {
        LoginDispatcher.dispatch({
            actionType: LoginConstants.LOGIN_REQUESTED,
            email: payload.email,
            password: payload.password,
        });
    }
}

export default LoginActions