import React from 'react';
import {Link} from "react-router-dom";
import './Article.css';
import Moment from 'react-moment';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  disable:'mobile'
});


const Article=({title,secondtitle,onClickArticle,id,image,text,added,favorite,isAdmIn})=>{	
	
	return (
		<div id='test' data-aos="fade-in"  data-aos-offset="150" data-aos-duration="800" >		
		<Link to={`/ArticleInfo/${id}`} onClick={()=>onClickArticle(id)} style={{textDecoration:'none',color:'black'}}>
		<div ><img  className='hoverImage size' src={image}  alt='test' /></div>		
		</Link>		
		<div className='txtStyle' style={{padding:'5px'}} >
		<p style={{color:'rgba(0,0,0,0.5)',marginBottom:'-20px',marginTop:'10px'}}><Moment fromNow >{added}</Moment></p>		
		<Link to={`/ArticleInfo/${id}`} onClick={()=>onClickArticle(id)} style={{textDecoration:'none',color:'black'}}>
		<h2 className='hoverTitle' style={{marginBottom:'-15px'}}>{title} </h2>
		</Link>		
		<p style={{marginBottom:'-15px'}}>{secondtitle} </p>		
		<br/>		
		</div>
		{isAdmIn 
			? (<div>
				<div className='btnStyle' >
				<Link to={`/ModifArticle/${id}`}><button className='submitDelMod' onClick={()=>onClickArticle(id)} >Modifier</button></Link> 
				<Link to={`/DeleteArticle/${id}`}><button className='submitDelMod' onClick={()=>onClickArticle(id)}>Supprimer</button></Link>
				</div>
				<div>
				<hr className='hrStyle' style={{width:'95%',marginTop:'-15px'}}/>
				</div>
				</div>
				)
			:<hr className='hrStyle' style={{width:'95%',marginTop:'-10px'}}/>
		}		
		</div>
		)
	
}

export default Article;