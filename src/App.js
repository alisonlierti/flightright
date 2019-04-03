import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'megadraft/dist/css/megadraft.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import PostList from './components/organisms/postlist/postList';
import PostNew from './components/organisms/postNew';
import PostDetail from './components/organisms/postDetail';
import Header from './components/molecules/Header';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter>
            <div>
              <Header />
              <div>
                <Switch>
                  <Route path="/posts/new" component={PostNew} />
                  <Route path="/posts/:id" component={PostDetail} />
                  <Route
                    path="/edit/:id"
                    render={props => <PostDetail isAdmin={true} {...props} />}
                  />
                  <Route
                    path="/admin"
                    render={props => <PostList isAdmin={true} {...props} />}
                  />
                  <Route path="/" component={PostList} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
