import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, IndexRoute, hashHistory } from 'react-router-dom';
import '../scss/example.scss'

class HomeFeed extends React.Component {
  render() {
    return (
    	<div>
      		<ContentLoad url="http://local.examples.com/poc_expand/src/version/v3/feed/home.json" />
	  	</div>
    )
  }
}
class About extends React.Component {
  render() {
    return (
    	<div>
      		<h1>This is About Page</h1>
	  	</div>
    )
  }
}

class HeaderNavList extends React.Component{
	constructor(props){
		super(props);
		console.log(props);
	}
	render(){
		var {list} = this.props;
		return (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">				
				<ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
					{list.map((item) => 
						(
							<li className="nav-item">
								<Link to={"/poc_expand/src"+item.url} className={"nav-link"}>{item.text}</Link>
							</li>
						)
					)}
				</ul>
			</div>
		)
	}
}

class ContentLoad extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
	}
	componentDidMount(){
		fetch(this.props.url)
			.then((resp) => resp.json())
			.then((resp) => {
				console.log("home feed data");
				console.log(resp.data);
				this.setState({data:resp.data});
			})
			.catch(function(error) {
		    	console.log(error);
			});
	}
	render(){
		console.log("render data"+this.state.data);
		if(this.state.data == null){
			return
		}
		return (
			<div>
				{
					this.state.data.map((item,idx) => (
						<CustomCard item={item} key={idx} />
					))
				}
			</div>
		)
	}
}




class CustomCard extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {item} = this.props;
		var res;
		if(item.card_type == "group_list") {
			 res = <CardGroup /> 
		} else if(item.card_type == "v3/filler_big"){
			res = <CardFiller />
		} else{
			res = "NoMatch"
		}
		return (
			<div>
				{res}
			</div>
		)
	}
}

class CardGroup extends React.Component{
	render(){
		return (
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Communities</h5>
				</div>
			</div>
		)
	}
}

class CardFiller extends React.Component{
	render(){
		return (
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Big Filler</h5>
				</div>
			</div>
		)
	}
}

class AppHeader extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list: []
		}
	}
	componentDidMount() {
		const url = `http://local.examples.com/poc_expand/src/version/v1/user/web-notifications-v2.json`;
		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => {
				this.setState({ list: resp.data })
			})
			.catch(function(error) {
		    	console.log(error);
			});
	}
	render(){
		const brandImg = `https://s3-ap-southeast-1.amazonaws.com/jiyo-task-content/top_header_logos/jiyo_internetofwellbeing_logo_sept.png`;
		const styleBgImg = {
			"backgroundImage": "url("+brandImg+")"
		}
		return (
			  <div>
			  		<nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
					  <a className="navbar-brand" href="#" style={styleBgImg}></a>
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  	<HeaderNavList list={this.state.list}/>
					</nav>
			  </div>
		)
	}
}

const MainRoute = ()=>{
	return (
		<div>
			<Route exact path="/poc_expand/src/" component={HomeFeed}/>
		</div>
	);
}

const Application = ()=>{
	return (
		<div>
			<AppHeader />
    		<MainRoute />
  		</div>
	);
};

render(
	<Router>
   		<Application/>
  	</Router>, document.getElementById('app'));





