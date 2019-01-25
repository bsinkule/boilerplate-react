/* eslint no-restricted-globals:0*/
import auth0 from "auth0-js";

const LOGIN_SUCCESS_PAGE = "/home"
const LOGIN_FAILURE_PAGE = "/"

class Auth {
  constructor(){
      this.auth0 = new auth0.WebAuth({
          domain: "bsinkule.auth0.com",
          clientID: "kZGUc85IVu5sfCs7klQ1dL7Tmi4H802i",
          // redirectUri: "https://boilerplate-bsinkule.netlify.com/callback",
          redirectUri: "http://localhost:8080/callback",
          audience: "https://bsinkule.auth0.com/userinfo",
          responseType: "token id_token",
          scope: "openid",
      });

      this.getProfile = this.getProfile.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
  }

    getProfile() {
      return this.profile;
    }

    getIdToken() {
      return this.idToken;
    }

    login(){
      this.auth0.authorize()
    }

    handleAuthentication(){
      this.auth0.parseHash((err, authResult) => {
          if(authResult && authResult.accessToken && authResult.idToken){
              let expiresAt = JSON.stringify((authResult.expiresIn) * 1000 + new Date().getTime())
              localStorage.setItem("access_token", authResult.accessToken)
              localStorage.setItem("id_token", authResult.idToken)
              localStorage.setItem("expires_at", expiresAt)
              localStorage.setItem("User_id", authResult.idTokenPayload.sub)
              location.hash = ""
              location.pathname = LOGIN_SUCCESS_PAGE
              this.idToken = authResult.idToken;
              this.profile = authResult.idTokenPayload;
          }
          else if(err){
              location.pathname = LOGIN_FAILURE_PAGE
          }
      })
    }

    isAuthenticated(){
      let expires_at = JSON.parse(localStorage.getItem("expires_at"))
      return new Date().getTime() < expires_at

    }

    logout(){
      localStorage.removeItem("access_token")
      localStorage.removeItem("id_token")
      localStorage.removeItem("expires_at")
      localStorage.removeItem("User_id")
      location.pathname = LOGIN_FAILURE_PAGE

    }

}

export default Auth