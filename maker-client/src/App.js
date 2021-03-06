import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import components
import AppHeader from './components/Header/appHeader';
import Footer from './components/Footer/Footer';
// import pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';
import NoMatch from './pages/NoMatch';
import Faves from './pages/Faves';
import Saves from './pages/Saves';
// import apollo provider
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <AppHeader />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/faves" component={Faves} />
              <Route exact path="/saves" component={Saves} />
              <Route exact path="/post/:id" component={SinglePost} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
