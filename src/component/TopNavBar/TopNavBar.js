import React from 'react';
import {Link} from "react-router-dom";
import './TopNavBar.css';


const TopNavBar=({onChangeRoute,isLoggedIn,onClickLogout,user})=>{

	if(isLoggedIn){
		return (
			<div className='ftSize' style={{backgroundColor:'black',padding:'10px',paddingBottom:'40px'}}>
		<div style={{marginTop:'10px'}}>
		<div style={{float:'left'}} >
			<Link className='topBtnHover' to={`/`} style={{padding:'5px',color:'white',textDecoration:'none'}}>Curly lo</Link>
			<Link className='topBtnHover' to={`/About`} style={{padding:'5px',color:'white',textDecoration:'none'}}>A propos</Link>
			<Link className='topBtnHover' to={`/Contact`} style={{padding:'5px',color:'white',textDecoration:'none'}}>Contact</Link>
		</div>
		<div style={{float:'right',marginTop:'-15px'}}>
			<p style={{color:'white',textDecoration:'none',display:'inline-block',marginRight:'10px'}} >{`Hi, ${user.name}`} </p>
			<Link className='topBtnHover' to={`/`} onClick={onClickLogout} style={{padding:'5px',color:'white',textDecoration:'none',display:'inline-block'}}>Se déconnecter</Link>
			
		</div>	
		</div>
		</div>		
			)
	}else{
		return (
		<div className='ftSize' style={{backgroundColor:'black',padding:'10px',paddingBottom:'40px'}}>
		<div style={{marginTop:'10px'}}>
		<div style={{float:'left'}} >
			<Link className='topBtnHover' to={`/`} style={{padding:'5px',color:'white',textDecoration:'none'}}>Curly lo</Link>
			<Link className='topBtnHover' to={`/About`} style={{padding:'5px',color:'white',textDecoration:'none'}}>A propos</Link>
			<Link className='topBtnHover' to={`/Contact`} style={{padding:'5px',color:'white',textDecoration:'none'}}>Contact</Link>
		</div>
		<div style={{float:'right'}}>
			<Link className='topBtnHover' to={`/Login`} style={{padding:'5px',color:'white',textDecoration:'none'}}>Se connecter</Link>
			<Link className='topBtnHover' to={`/Register`} style={{padding:'5px',color:'white',textDecoration:'none'}}>S'enregister</Link>
		</div>	
		</div>
		</div>		
		)
	}	
}

export default TopNavBar;