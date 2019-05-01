export class User {
    set access_token(access_token) { sessionStorage.setItem('access_token', access_token) }
    get access_token() { return sessionStorage.getItem('access_token') }
}

const currentUser = new User()

export default currentUser;
