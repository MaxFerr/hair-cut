import React from 'react';
import './Title.css';
import {Link} from "react-router-dom";

const Title=({isAdmIn})=>{
	
	return (
		<div className='jumbotron' style={{padding:'90px'}}>
		{isAdmIn
			?
			(<div>			
			<Link to={`/AddArticle`} ><button className='addArticleBtnStyle'>+ Ajouter un article</button></Link>
			</div>)
			:(<div>
			<h1 style={{fontSize:'5vmax',color:'rgba(183,90,136,1)',marginTop:'-5px',textShadow:' 2px 6px rgba(183,90,136,0.2)'}}><em>Curly lo</em></h1>			
			</div>)
		}			
		</div>
		)
	
}

export default Title;