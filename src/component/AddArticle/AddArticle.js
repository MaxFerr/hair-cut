import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import './addArticle.css';

class AddArticle extends Component{
	constructor(props){
		super(props);
		this.state={
			Image:'',
			Title:'',
			SecondTitle:'',
			Text:'',
			favorite:false,
			path:'',
			articleSend:false,
			link:''			
		}
	}

	onImagechange=(event)=>{
		this.setState({Image:event.target.files[0]})				
	}

	onLinkchange=(event)=>{
		this.setState({link:event.target.value})				
	}

	onTitlechange=(event)=>{
		this.setState({Title:event.target.value})
	}

	onSecondTitlechange=(event)=>{
		this.setState({SecondTitle:event.target.value})		
	}

	onTextchange=(event)=>{
		this.setState({Text:event.target.value})
	}

	onFavchange=(event)=>{
		if(this.state.favorite){
			this.setState({favorite:false})
		}else{
			this.setState({favorite:true})
		}
		
	}

	

	onAddArticle=()=>{
		fetch('https://powerful-everglades-57723.herokuapp.com/newarticle',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
				image:this.state.link,				
				title:this.state.Title,
				secondtitle:this.state.SecondTitle,
				text:this.state.Text,
				added:new Date(),
				favorite:this.state.favorite,
				user:this.props.user.id
				})
			})
			.then(response=>{				
				return response.json()
			})
			.then(article=>{
				if(article.m_article_id){
					const articleMsg=document.getElementById('articleMsg');
					articleMsg.style.color='green'
					articleMsg.textContent='Article sauvegardé. Vous allez être redirigé vers la page principale dans 3 sec.'					
					fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
				      return response.json()
				    })
				    .then(article=>{
				     this.props.onUpdateArticle(article)     
				    })    
				const onRedirect=()=>{
					this.setState({articleSend:true})
				}
				setTimeout(onRedirect, 3000);
				}else{
					const articleMsg=document.getElementById('articleMsg');
					articleMsg.style.color='red'
					articleMsg.textContent=`L'article n'a pas pu être sauvegardé.`					
				}				
			})

		/*
			var formData = new FormData();
			var fileField = document.querySelector("input[type='file']");			
			formData.append('myImage', fileField.files[0]);
			fetch('https://powerful-everglades-57723.herokuapp.com/upload', {
			  method: 'post',
			  body: formData
			})
			.then(response=>{				
			return response.json()
			})
			.then(path=>{
			if(path){
				this.setState({path:path})
				fetch('https://powerful-everglades-57723.herokuapp.com/newarticle',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
				image:this.state.path,				
				title:this.state.Title,
				secondtitle:this.state.SecondTitle,
				text:this.state.Text,
				added:new Date(),
				favorite:this.state.favorite,
				user:this.props.user.id
				})
			})
			.then(response=>{				
				return response.json()
			})
			.then(article=>{
				if(article.m_article_id){
					const articleMsg=document.getElementById('articleMsg');
					articleMsg.style.color='green'
					articleMsg.textContent='Article saved. You will be redirected to main page in 3sec.'					
					fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
				      return response.json()
				    })
				    .then(article=>{
				     this.props.onUpdateArticle(article)     
				    })    
				const onRedirect=()=>{
					this.setState({articleSend:true})
				}

				setTimeout(onRedirect, 3000);
				}else{
					const articleMsg=document.getElementById('articleMsg');
					articleMsg.style.color='red'
					articleMsg.textContent='Article could not be saved.'					
				}				
			})
				}else{
					const imageMsg=document.getElementById('imageMsg')
					imageMsg.style.color='red'
					imageMsg.textContent='Cannot upload that file.'					
				}				
			})	*/	
		}
	
	render(){
		return (
			<div>
			{this.props.isAdmIn ?(
			<div>
						{this.state.articleSend ?
							<Redirect to='/' />
							:<div style={{minHeight:'500px'}} className='addArticleStyle' >
										<h1>Add Article</h1>
										<div className='add-input-container'>							
											<p className='pStyle' >Image :</p>																
											<input
											className='custom-file-input' 
											style={{marginTop:'10px',float:'left',marginLeft:'10%'}}
											onChange={this.onImagechange} 
											type='file'
											name="myImage"
											disabled  
											/>							
											<br/>
											{this.state.Image?
												<p className='pStyle' style={{marginTop:'35px',color:'green'}} ><em>{this.state.Image.name}</em></p>
												:<p className='pStyle' style={{marginTop:'35px'}}><em>Aucun fichier sélectionné.</em></p>
											}		
												<p className='pStyle' style={{marginTop:'25px'}} >Lien de l'image </p>
												<input className='inputStype'
												onChange={this.onLinkchange} 
												type='text' 
												placeholder='Link'/>
												<p className='pStyle' style={{marginTop:'25px'}} >Titre </p>
												<input className='inputStype'
												onChange={this.onTitlechange} 
												type='text' 
												placeholder='Title'/>
													<p className='pStyle'>Deuxième titre </p>
													<input className='inputStype'
													type='text' placeholder='Deuxième titre'
													onChange={this.onSecondTitlechange}
													/>
													<p className='pStyle'>Text </p>
										<textarea  className='inputStype'
										onChange={this.onTextchange} 
										type='text' 
										placeholder='Text'/>
										</div>
										<br/>
										<p style={{display:'inline-block',marginRight:'5px'}} >Favoris ?  </p><input onChange={this.onFavchange} type='checkbox' />
										<br/>
										<input className='submit' onClick={this.onAddArticle} type='submit'/>
										<br/>
										<span id='articleMsg'></span>
										<span id='imageMsg'></span>
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


export default AddArticle;