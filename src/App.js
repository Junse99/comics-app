import './App.css';
import 'antd/dist/antd.css';
import PanelComics from './containers/Comics/PanelComics'
import Home from './containers/Home/Home'
import ManageComics from './containers/Comics/ManageComics'
import MasterLayout from './layouts/Master';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store' 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MasterLayout>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/comics' exact component={PanelComics} />
            <Route path='/comics/manage' component={ManageComics} />
          </Switch>
        </MasterLayout>
      </Router>
    </Provider>

  );
}

export default App;
