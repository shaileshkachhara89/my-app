import logo from './logo.svg';
import './App.css';
import { authProvider } from './authProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import Main from './Main';

function App() {
 
  return (
    
    <div className="App">
 <AzureAD provider={authProvider}>
      <span>Only authenticated users can see me.</span>
    </AzureAD>
 
 <AzureAD provider={authProvider} forceLogin={true}>
  {
    ({login, logout, authenticationState, error, accountInfo}) => {
      switch (authenticationState) {
        case AuthenticationState.Authenticated:
          return (
            <p>
              <span>Welcome, {accountInfo.account.userName}!</span>
              <span>{accountInfo.jwtIdToken}</span>
              <button onClick={logout}>Logout</button>
            </p>
          );
        case AuthenticationState.Unauthenticated:
          return (
            <div>
              {error && <p><span>An error occured during authentication, please try again!</span></p>}
              <p>
                <span>Hey stranger, you look new!</span>
                <button onClick={login}>Login</button>
              </p>
            </div>
          );
        case AuthenticationState.InProgress:
          return (<p>Authenticating...</p>);
      }
    }
  }
</AzureAD>
<Main/>
    </div>
  );
}
export default App;