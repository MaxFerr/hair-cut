import React, { Component } from 'react';
import {Redirect,Link} from "react-router-dom";
import './DeleteArticle.css';


class DeleteArticle extends Component{
	
	constructor(props){
		super(props);
		this.state={
				id:this.props.singleArticle.id,
				deleted:false
		}
	}

	onDeleteArticle=()=>{
		fetch('https://powerful-everglades-57723.herokuapp.com/deleteArticleS/'+this.props.match.params.id, {
		  method: 'delete',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		  	id:this.props.match.params.id,
		  	oldImagePath:this.props.singleArticle.image,
		  	user:this.props.user.id
		  })
		})
		.then(res => res.json()) 
		.then(res => {			
			if(res.m_article_id){					
					fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
				      return response.json()
				    })
				    .then(article=>{
				    	this.props.onUpdateArticle(article)				          
				    })
				    this.setState({deleted:true})    
				}else{
					this.setState({deleted:false})
					const deleteMsg=document.getElementById('deleteMsg');
					deleteMsg.style.color='red';
					deleteMsg.textContent=`L'article n'a pas pu être supprimé.`
				}
			})
		
	}

	render(){
	const {isAdmIn,singleArticle}= this.props
	const {deleted}= this.state		
	return (
		<div>
		{isAdmIn
			?(
				<div>
					{deleted ?
						<Redirect to='/' />
					:<div style={{minHeight:'400px'}} >
					<span id='deleteMsg' 
					style={{boxShadow: '2px 2px 2px grey', backgroundColor:'rgba(0,0,0,0.04)',
    				borderRadius:'10px'}} ></span>
					<h1>Voulez-vous supprimer cet article ?</h1>
					<div style={{textAlign:'left', marginLeft:'15%',marginRight:'15%'}} >
					<p>Titre : {singleArticle.title} </p>
					<p>Deuxième titre : {singleArticle.secondtitle} </p>
					<p>Text : {singleArticle.text} </p>
					</div>
					<br/>			
					<button
					className='submitDel'
					onClick={()=>{this.onDeleteArticle()}}
					>Oui</button> <Link to={`/`}><button className='submitDel'>Non</button></Link>
				</div>
			}
			</div>
				)
			:<h3 style={{color:'red',minHeight:'350px'}}>Page could not be loaded.</h3>
		}
		
			</div>
		)
	
	}
}

export default DeleteArticle;