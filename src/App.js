import './App.css'
import Homepage from './pages/Homepage';
import Navigation from './components/Navigation';
import UserProfile from './pages/UserProfile';
import YourProfile from './pages/YourProfile'
import UploadPage from './pages/UploadPage';

import {
  Route,
  Switch
} from "react-router-dom";


function App() {

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/profile/:id" component={UserProfile} />
        <Route path="/yourprofile" component={YourProfile} />
        <Route path='/uploadimages' component={UploadPage} />
      </Switch>
    </>
  )
}


export default App;

