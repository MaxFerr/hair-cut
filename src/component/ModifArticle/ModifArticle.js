import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import './ModifArticle.css';


class ModifArticle extends Component{
	
	constructor(props){
		super(props);
		this.state={
				title:this.props.singleArticle.title,
				secondtitle:this.props.singleArticle.secondtitle,
				image:null,
				text:this.props.singleArticle.text,
				favorite:this.props.singleArticle.favorite,
				path:'',
				id:this.props.match.params.id,
				articleMod:false,
				link:this.props.singleArticle.image
		}
	}

	onTitleChange=(event)=>{
		this.setState({title:event.target.value})
	}

	onLinkchange=(event)=>{
		this.setState({link:event.target.value})				
	}

	onSecondtitleChange=(event)=>{
		this.setState({secondtitle:event.target.value})
	}

	onImagechange=(event)=>{
		this.setState({image:event.target.files[0]})					
	}

	onTextchange=(event)=>{
		this.setState({text:event.target.value})		
	}

	onFavchange=(event)=>{
		if(this.state.favorite){
			this.setState({favorite:false})
		}else{
			this.setState({favorite:true})
		}
		
	}

	onModArticle=()=>{
		const erroModif=document.getElementById('erroModif')
		fetch('https://powerful-everglades-57723.herokuapp.com/modifArticle',{
			method:'put',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				image:this.state.link,
				title:this.state.title,
				secondtitle:this.state.secondtitle,
				text:this.state.text,
				favorite:this.state.favorite,
				m_article_id:this.state.id,
				user:this.props.user.id
			})
		})
		.then(response=>{				
			return response.json()
		})
		.then(article=>{
			if(article.m_article_id){
				fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
				      return response.json()
				    })
				    .then(article=>{
				     this.props.onUpdateArticle(article)     
				    })    
					const onRedirectMod=()=>{
					this.setState({articleMod:true})
				}
				setTimeout(onRedirectMod, 3000);
					erroModif.style.color='green';
					erroModif.textContent='Article sauvegardé. Redirection vers la page principale.'
					return "Article sauvegardé."
				}else{
				erroModif.style.color='red';
				erroModif.textContent=`L'article n'a pas pu être sauvegardé.`
					return "Article could not be saved."
				}				
		})
		/*if(this.state.image===null){
			fetch('https://powerful-everglades-57723.herokuapp.com/modifArticle',{
			method:'put',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				image:this.props.singleArticle.image,
				title:this.state.title,
				secondtitle:this.state.secondtitle,
				text:this.state.text,
				favorite:this.state.favorite,
				m_article_id:this.state.id,
				user:this.props.user.id
			})
		})
		.then(response=>{				
			return response.json()
		})
		.then(article=>{
			if(article.m_article_id){
				fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
				      return response.json()
				    })
				    .then(article=>{
				     this.props.onUpdateArticle(article)     
				    })    
					const onRedirectMod=()=>{
					this.setState({articleMod:true})
				}
				setTimeout(onRedirectMod, 3000);
					erroModif.style.color='green';
					erroModif.textContent='Article saved. Redirecting to main page.'
					return "Article saved."
				}else{
				erroModif.style.color='red';
				erroModif.textContent='Article could not be saved.'
					return "Article could not be saved."
				}				
		})

		}else{
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
				fetch('https://powerful-everglades-57723.herokuapp.com/modifArticle',{
				method:'put',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
				image:this.state.path,				
				title:this.state.title,
				secondtitle:this.state.secondtitle,
				text:this.state.text,
				favorite:this.state.favorite,
				m_article_id:this.state.id,
				oldImagePath:this.props.singleArticle.image,
				user:this.props.user.id
				})
			})
			.then(response=>{				
				return response.json()
			})
			.then(article=>{
				if(article.m_article_id){
					fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
				      return response.json()
				    })
				    .then(article=>{
				     this.props.onUpdateArticle(article)     
				    })    
					const onRedirectMod=()=>{
					this.setState({articleMod:true})
				}
				setTimeout(onRedirectMod, 3000);
					erroModif.style.color='green';
					erroModif.textContent='Article saved. Redirecting to main page.'
					return "Article saved."
				}else{
					erroModif.style.color='red';
					erroModif.textContent='Article could not be saved.'
					return "Article could not be saved."
				}				
			})
				}else{
					erroModif.style.color='red';
					erroModif.textContent='Cannot upload that file.'
					return "Cannot upload that file."
				}				
			})			

		}*/
			
	}

	render(){
	return (
		<div>
		{this.props.isAdmIn
			?( <div>
				{this.state.articleMod
				?<Redirect to='/' />
				:(<div>
					<div style={{minHeight:'1000px'}} >
				<h1>Modifier l'article</h1>
					<p className='modpStyle' style={{marginBottom:'10px'}} >Image actuelle</p>
					<div style={{maxWidth:'700px',marginLeft:'auto',marginRight:'auto'}} >
					<img src={this.props.singleArticle.image} alt='modif' style={{width:'80%',height:'auto'}} />
					</div>
					<p className='modpStyle'>Nouvelle image</p>
					<input
					style={{marginTop:'10px',float:'left',marginLeft:'10%'}}
					className='custom-file-input2' 
					onChange={this.onImagechange} 
					type='file'
					name="myImage"
					disabled 
					/>					
					<br/>
								{this.state.image?
									<p className='pStyle' style={{marginTop:'35px',color:'green'}} ><em>{this.state.image.name}</em></p>
									:<p className='pStyle' style={{marginTop:'35px'}}><em>Aucun fichier sélectionné.</em></p>
								}
							<p className='pStyle' style={{marginTop:'25px'}} >Lien de l'image </p>
												<input className='inputStype'
												onChange={this.onLinkchange} 
												type='text' 
												placeholder={`${this.props.singleArticle.image}`}/>						
						<p className='modpStyle' style={{marginTop:'20px'}} >Titre</p>
						<input
						className='modinputStype' 
						onChange={this.onTitleChange} 
						type='text' 
						placeholder={`${this.props.singleArticle.title}`} />
							<p className='modpStyle'>Deuxième titre</p>
							<input
							className='modinputStype'  
							type='text' placeholder={`${this.props.singleArticle.secondtitle}`}
							onChange={this.onSecondtitleChange}
							/>
				<p className='modpStyle'>Text</p>
				<textarea
				className='modinputStype'  
				onChange={this.onTextchange} 
				type='text' 
				placeholder={`${this.props.singleArticle.text}`}/>
				<br/>
				<p style={{display:'inline-block',marginRight:'5px'}} >Favoris ?  </p><input onChange={this.onFavchange} type='checkbox' />
				<br/>
				<input
				className='modsubmit'   
				onClick={this.onModArticle} type='submit'/>
				<br/>
				<span id='erroModif'></span>
			</div>
				</div>)
			}
			</div>
				)
			:<h3 style={{color:'red',minHeight:'350px'}}>Page could not be loaded.</h3>
		}		
		</div>
		
		)
	
	}
}

export default ModifArticle;