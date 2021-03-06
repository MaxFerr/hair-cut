import React, { Component } from 'react';
import Comment from '../Comment/Comment.js'
import './ArticleInfo.css';
import Moment from 'react-moment';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  disable:'mobile'
});

class ArticleInfo extends Component{
	constructor(props){
    super(props);
    this.state={
    	selectedArticle:[],
    	comments:[],
    	commentText:'',
    	commentsresp:[],
    	prm:this.props.match.params.id    	     
    }
  }

  onDeleteCommentResp=(id)=>{
  	fetch('https://powerful-everglades-57723.herokuapp.com/deleteCommentResp/'+id, {
		  method: 'delete',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		  	id:id,
		  	user:this.props.user.id
		  })
		})
		.then(res => res.json()) 
		.then(res => {
		//if we receive the id of the deleted comment, we update the commentsresp state			
			if(res.m_commentresp_id){
				    fetch(`https://powerful-everglades-57723.herokuapp.com/commentresponse/${this.props.match.params.id}`)
				    .then(response=>{
				      return response.json()
				    })
				    .then(commentresponse=>{
				      this.setState({commentsresp:commentresponse})     
				    })
				}else{
					const commentMsg=document.getElementById('commentMsg');
					commentMsg.style.color='red';
					commentMsg.textContent=`Cette réponse n'a pas pu être supprimée.`
				}
			})
  }

  onDeleteComment=(id)=>{
  	fetch('https://powerful-everglades-57723.herokuapp.com/deleteComment/'+id, {
		  method: 'delete',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		  	id:id,
		  	user:this.props.user.id
		  })
		})
		.then(res => res.json()) 
		.then(res => {
		//if we receive the id of the deleted comment, we update the commentsresp and the comment state. (when we delete a comment, it will delete all the commentresp)				
			if(res.m_comment_id){					
					 fetch(`https://powerful-everglades-57723.herokuapp.com/comments/${this.props.match.params.id}`)
				    .then(response=>{
				      return response.json()
				    })
				    .then(comments=>{
				      this.setState({comments:comments})     
				    })
				    fetch(`https://powerful-everglades-57723.herokuapp.com/commentresponse/${this.props.match.params.id}`)
				    .then(response=>{
				      return response.json()
				    })
				    .then(commentresponse=>{
				      this.setState({commentsresp:commentresponse})     
				    })
				}else{
					const commentMsg=document.getElementById('commentMsg');
					commentMsg.style.color='red';
					commentMsg.textContent=`Ce commentaire n'a pas pu être supprimé.`
				}
			})
  }

  updateCommentResp=(param)=>{
  	this.setState({commentsresp:param})
  }

  componentDidMount(){
  /*Change to make one fetch -- in server: join table */    
    fetch(`https://powerful-everglades-57723.herokuapp.com/article/${this.props.match.params.id}`).then(response=>{
      return response.json()
    })
    .then(selectedArticle=>{
      this.setState({selectedArticle:selectedArticle})     
    })

    fetch(`https://powerful-everglades-57723.herokuapp.com/comments/${this.props.match.params.id}`)
    .then(response=>{
      return response.json()
    })
    .then(comments=>{
      this.setState({comments:comments})     
    })

    fetch(`https://powerful-everglades-57723.herokuapp.com/commentresponse/${this.props.match.params.id}`)
    .then(response=>{
      return response.json()
    })
    .then(commentresponse=>{
      this.setState({commentsresp:commentresponse})     
    })                
  }

  onCommentChange=(event)=>{
  	this.setState({commentText:event.target.value})
  }

  onSubmitComment=()=>{
  	//sending data to server(comment)
  	fetch('https://powerful-everglades-57723.herokuapp.com/sendComment',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					article_id:this.props.match.params.id,
					comment:this.state.commentText,
					user_id:this.props.user.id,
					added:new Date()
				})
			})
			.then(response=>{				
				return response.json()
			})
			.then(commentId=>{
				//if id is true we update the comments state/array
			if(commentId.m_comment_id){
				const resetField=document.getElementsByTagName('textarea')[0];
				resetField.value='';
				const error=document.getElementById('errorComment');
				error.textContent='Commentaire envoyé !'
				error.style.color='green';	
			fetch(`https://powerful-everglades-57723.herokuapp.com/comments/${this.props.match.params.id}`)
			.then(response=>{			
				return response.json()
			})
			.then(data=>{			
				this.setState({comments:data})				
			})
			}else{
				const error=document.getElementById('errorComment');				
				error.textContent=`Le commentaire n'a pas pu être envoyé.`;
				error.style.color='red';				
			}
		})	
  }

  render(){
  	function displayDIV() {			
			var x = document.getElementById("myDIV");
			var y = document.getElementById("secondDiv");
			if (x.style.display === "none") {
				x.style.display = "block";
				y.style.marginTop = "0";
			} else {
				x.style.display = "none";
				y.style.marginTop = "10px";
			}
		}

		const {selectedArticle}=this.state;
		const {isLoggedIn}=this.props;

  	return (
		<div data-aos="fade-in"  data-aos-offset="150" data-aos-duration="800"  style={{textAlign:'left',marginBottom:'20px'}}>
		<span id='commentMsg' 
		style={{boxShadow: '2px 2px 2px grey', backgroundColor:'rgba(0,0,0,0.04)',borderRadius:'10px'}} >
		</span>
		{selectedArticle.image===undefined && selectedArticle.title===undefined
			?<p style={{color:'gray',textAlign:'center'}} >Loading<span className='loadingDot'>.</span><span className='loadingDot'>.</span><span className='loadingDot'>.</span></p>
			:<div>
				<img src={selectedArticle.image} alt='uploaded' 
				style={{borderRadius:'10px', opacity:'0.4',marginTop:'-25px',maxWidth:'100%', height:'200px',display: 'block',marginLeft:'auto',marginRight:'auto'}} />
				<div style={{marginLeft:'15%',marginRight:'15%',maxWidth:'100%'}} >
				<h1>{selectedArticle.title} </h1>
				<p style={{color:'rgba(0,0,0,0.5)',marginTop:'-15px'}} ><Moment format="DD/MM/YYYY">{selectedArticle.added}</Moment></p>		
				<h3>{selectedArticle.secondtitle} </h3>
				<p>{selectedArticle.text}</p>
				</div>
			</div>
		}		
		
		<br/>
		<div className='commentStyle2'>
						<h3 style={{display:'inline-block',marginRight:'20%'}} >Commentaire</h3>
						<button
						className='AddCommentStyle'  
						onClick={displayDIV}
						>Ajouter un commentaire</button>
						<hr style={{width:'70%',marginTop:'-5px'}} />						
						<div id='myDIV' style={{height:'150px',display:'none',marginRight:'15%',marginLeft:'15%'}} >
						{isLoggedIn
							?(<div>
							<textarea
							className='textareaStyle' 
							rows="5" 
							cols="70" 
							style={{height:'80px',maxWidth:'90%',marginRight:'auto',marginLeft:'auto'}}
							onChange={this.onCommentChange} 
							>
							</textarea>							
							<input
							className='submitCommentStyle' 							 
							type='submit'
							onClick={this.onSubmitComment}
							/>
							  </div>)
							:(<div>
								<textarea
								className='textareaStyle'
								placeholder='Vous devez être connecté pour envoyer un commentaire.' 
								rows="5" 
								cols="70" 
								style={{height:'80px',maxWidth:'90%',marginRight:'auto',marginLeft:'auto'}}
								onChange={this.onCommentChange} 
								>
								</textarea>	
							</div>)
						}						
							<br/>
							<span id='errorComment' className='red'></span>							
							<hr style={{width:'50%'}} />
						</div>						
							<div id='secondDiv' style={{marginTop:'10px'}}>
							<div>								
									<Comment 
									onDeleteComment={this.onDeleteComment} 
									comments={this.state.comments} 
									commentsresp={this.state.commentsresp} 
									onResponse={this.onResponse} 
									user={this.props.user} 
									prm={this.state.prm} 
									updateCommentResp={this.updateCommentResp}
									onDeleteCommentResp={this.onDeleteCommentResp}
									isAdmIn={this.props.isAdmIn}
									isLoggedIn={this.props.isLoggedIn}	
									 />								
							</div>
						</div>
					</div>
		</div>		
		)

  }
}

export default ArticleInfo;