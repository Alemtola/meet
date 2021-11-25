import React from "react";
import './WelcomeScreen.css';
import logo from './images/logo.png';
import Container from 'react-bootstrap/Container';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <Container >
        <div className="WelcomeScreen-wrapper">
          <div className="WelcomeScreen">
          
              <div className="App-logo" >
                <img src={logo} alt="meet app logo"/>
              </div>
              <h1>Welcome to the Meet app</h1>
              <br/>
              <h5>
              Log in to see upcoming events around the world for
              Web Developers
              </h5> 
              <div className="button_cont" align="center">
                <div className="google-btn">
                    <div className="google-icon-wrapper">
                      <img
                      class="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google sign-in"
                      />
                    </div>
                    <button onClick={() => { props.getAccessToken() }}
                      rel="nofollow noopener"
                      class="btn-text"
                      >
                      <b>Sign in with google</b>
                    </button>
                </div>
              </div>
              <a
                href="https://alemtola.github.io/meet/privacy.html"
                rel="nofollow noopener"
                >
                Privacy policy
              </a>
            
          </div>
        </div>
    </Container>
  )
: null
}

export default WelcomeScreen;
