import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, IndexRoute, hashHistory } from 'react-router-dom';
import '../scss/cards.scss'

class HomeFeed extends React.Component {
  render() {
    return (
    	<div className="container">
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
								<Link to={`/poc_expand/src${item.url}`} className={"nav-link"}>{item.text}</Link>
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
			<div class="card-columns">
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
			 res = <CardGroup item={item} /> 
		} else if(item.card_type == "v3/filler_big"){
			res = <CardFiller item={item} />
		} else if(item.card_type == "v3/response"){
			res = <CardResponse item={item} />
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

class CardResponse extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let item = this.props.item;
		let category = this.props.item.category;
		let categoryImg = category.image;
		let styleBgImg = {
			"backgroundImage": "url("+categoryImg+")",
			"backgroundRepeat": "no-repeat"
		}
		console.log(item.teaser_image.preview);
		return (
			<div className="card custom-card">
				<div className="card-block">
					<h4 className={"card-title "+(item.reason.length == 0) ? "d-none": ""} dangerouslySetInnerHTML={{__html: item.reason}} />
					<div className="card-img-overlay1" style={styleBgImg}>
						<img className="card-img-top" src={item.teaser_image.preview} alt="" />
					</div>
					<div className="container">
						<div className="row custom-card-links align-items-center">
							<div className="col col-2">
								<a href="#" className="card-link">
									<img className="img-fluid rounded-circle" src={item.author.image} alt="" />
								</a>
							</div>
							<div className="col col-10">
								<a href="#" className="card-link custom-link-detail" dangerouslySetInnerHTML={{__html: item.title}}></a>
							</div>
						</div>
						<div className="row justify-content-end">
						    <div className="col-4">
						      <a href="#" className="custom-icon custom-icon-comment"></a>
						    </div>
						    <div className="col-4">
						      <a href="#" className="custom-icon custom-icon-like"></a>
						    </div>
						</div>
					</div>
					
				</div>
			</div>
		)
	}
}

class CardGroup extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let item = this.props.item;
		let groups = item.groups;
		return (
			<div className="card">
				<div class="card-block">
					<div className="card-body">
						<h4 className="card-title">Communities</h4>
					</div>
					<ul className="list-group list-group-flush">
						{groups.map((item) => 
							(<li className="list-group-item">{item.group.name}</li>)
						)}
					</ul>
				</div>
			</div>
		)
	}
}

class CardFiller extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {item} = this.props;
		return (
			<div className="card">
				<div className="card-block">
					<img className="card-img-top" src={item.teaser_image.preview} alt="Card image cap" />
					<div className="card-body">
						<p className="card-text">{item.title}</p>
					</div>
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
		<div className="container-area">
			<Route path="/poc_expand/src/" component={HomeFeed}/>
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





