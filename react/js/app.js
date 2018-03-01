import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, IndexRoute, hashHistory } from 'react-router-dom';
import HelloWorld from './components/HelloWorld'

/*class App extends React.Component {
  render () {
    return <p> Hello React project</p>;
  }
}*/

/*const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
)*/

/*class App extends React.Component {
  render() {
    return (
      <div>
      	<h1>This is default Page</h1>
    	<Header />
    	<Main />
    	<Footer />
  	</div>
    )
  }
}*/

class Home extends React.Component {
  render() {
    return (
      <div>
      	<h1>This is Home Page</h1>
    	<Header />
    	<Main />
    	<Footer />

  	</div>
    )
  }
}
class About extends React.Component {
  render() {
    return (
      <div>
      	<h1>This is About Page</h1>
    	<Header />
    	<Main />
    	<Footer />

  	</div>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/react/">Home</Link></li>
        <li><Link to="/react/about">About</Link></li>
      </ul>

      <hr/>

      <Route exact path="/react/" component={Home}/>
      <Route path="/react/about" component={About}/>
    </div>
  </Router>
)

const Header = () => <h1>Header</h1>
const Main = () => <h1>Main</h1>
const Footer = () => <h1>Footer</h1>

export default App;

render(<App />, document.getElementById('app'));

