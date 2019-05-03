import axios from 'axios'
import currentUser from '../helper/auth';
axios.defaults.withCredentials = true;

class API {
    constructor() {
        this._app = null
    }

    get login() {
        if (!this._lapp) {
            this._lapp = axios.create({
            })
        }
        return this._lapp
    }
    get app() {
        if (!this._app) {
            this._app = axios.create({
                headers: {
                    'Authorization': currentUser.access_token
                }
            })
        }
        return this._app
    }

    logout = () => {
        currentUser.logout();
        window.location.replace(window.location.origin);
    }

    async changeLocale(locale) {
        return this.app
          .get(`/update_language/${locale}`)
          .then((resp) => {
            window.location.reload();
          }).catch((e) => {
            console.error(e)
          })
      }

    parseError = (e) => {        
        try {
            if (!!e && !!e.response && !!e.response.data) {
                if (!!e.response.data.error) {
                    if (e.response.data.error == 'Invalid token' || e.response.data.error == 'Token expired') {
                        this.logout()
                    }
                    return e.response.data.error
                }
                if (!!e.response.data.errors) {
                    return e.response.data.errors[0]
                }                
                if (!!e.response.data.errors.errors) {
                    return e.response.data.errors.errors[0]
                }                
            }
        } catch (err) {
            console.error(err)
        }
        return 'common error'
    }
}

const instance = new API()

export default instance;
