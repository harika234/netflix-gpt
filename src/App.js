

import { Provider } from 'react-redux';
import Body from './components/Body';
import Browse from './components/Browse';
import Login from './components/Login';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store = {appStore}>
    <Body/>
    </Provider>
  );
}

export default App;
