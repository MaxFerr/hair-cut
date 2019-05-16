import React, { Component } from 'react';
import './MainNavBar.css';
import {Link,withRouter} from "react-router-dom";


class MainNavBar extends Component{
	constructor(props){
		super(props);
		this.state={
			searchBox:''
		}
	}
	onInputChange=(event)=>{
		this.setState({searchBox:event.target.value})
		this.props.onSearchChange(event.target.value)
	}
	onClickSearch=()=>{
		const searchbox=document.getElementById('searchbox');
		this.setState({searchBox:searchbox.value});
		this.props.onSearchChange(this.state.searchBox)
	}
	render(){
		if(this.props.location.pathname!=='/'){
			return (
				<div style={{padding:'10px',paddingBottom:'20px'}}>		
			<div style={{marginTop:'20px'}} >
			<ul className="navigation">
				<li className='btnHover' ><Link to={`/Beginner`}>DÉBUTANTE ? COMMENCE ICI !</Link></li>
				<li className='btnHover'><Link to={`/Hair`}>CHEVEUX BOUCLÉS</Link></li>				
			</ul>		
				<br/>
				<hr style={{marginTop:'20px',width:'50%'}}/>
				</div>		
			</div>	
			)			
		}else{
			return (
				<div style={{padding:'10px',paddingBottom:'20px'}}>					
			<div style={{marginTop:'20px'}} >
			<ul className="navigation">
				<li className='btnHover'><Link to={`/Beginner`}>DÉBUTANTE ? COMMENCE ICI !</Link></li>
				<li className='btnHover'><Link to={`/Hair`}>CHEVEUX BOUCLÉS</Link></li>
				<li>
				<div className='test' >
							<input id="searchbox" className='inputSearchStype' onChange={this.onInputChange}  type="text" />
							<button
							className='submitSearch'
							onClick={this.onClickSearch}
							>Cherché
							</button>
				</div>
				</li>
			</ul>		
				<br/>
				<hr style={{marginTop:'20px',width:'50%'}}/>
				</div>		
			</div>		
			)
		}
		
	}
}


export default withRouter(MainNavBar);