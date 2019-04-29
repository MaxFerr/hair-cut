import React from 'react';
import './Title.css';
import {Link} from "react-router-dom";

const Title=({isAdmIn})=>{
	
	return (
		<div className='jumbotron' style={{padding:'90px'}}>
		{isAdmIn
			?
			(<div>
			<h1 style={{color:'white'}}>Title</h1>
			<Link to={`/AddArticle`} ><button className='addArticleBtnStyle'>+ Add Article</button></Link>
			</div>)
			:(<div>
			<h1 style={{color:'white',marginTop:'-5px'}}>Title</h1>			
			</div>)
		}			
		</div>
		)
	
}

export default Title;