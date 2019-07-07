import React, { Component } from 'react';
import './CommentCard.css';
import Moment from 'react-moment';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  disable:'mobile'
});

class CommentCard extends Component{
	constructor(props){
		super(props);
		this.state={
			responseComment:''			
		}
	}

	onCreateResponse=(id)=>{
	//text area on commentresp-- each response must have their own textarea so they all have a different id 		
			var a = document.getElementById(`myDIV2${id}`);
			var b = document.getElementById(`secondDiv2${id}`);
			if (a.style.display === "none") {
				a.style.display = "block";
				b.style.marginTop = "0";
			} else {
				a.style.display = "none";
				b.style.marginTop = "10px";
			}
			const resetField2=document.getElementById(`responseArea${id}`);
				resetField2.value='';
				const responseSent=document.getElementById(`responseSent${id}`);
				responseSent.textContent='';
				const responseNotSent=document.getElementById(`responseNotSent${id}`);
				responseNotSent.textContent=''
		
	}

	onResponseChange=(event)=>{
		this.setState({responseComment:event.target.value})		
	}

	onResponse=(id)=>{
		//text area on commentresp-- each response must have their own textarea and button so they all have a different id 	
		const resetField2=document.getElementById(`responseArea${id}`);
		const responseSent=document.getElementById(`responseSent${id}`);
		const responseNotSent=document.getElementById(`responseNotSent${id}`);
  	fetch('https://powerful-everglades-57723.herokuapp.com/sendResponse',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					article_id:this.props.prm,
					comment:this.state.responseComment,
					user_id:this.props.user.id,
					added:new Date(),
					comment_id:id
				})
			})
			.then(response=>{				
				return response.json()
			})
			.then(respcommentId=>{				
			if(respcommentId.m_commentresp_id){
				resetField2.value='';				
				responseSent.textContent='Réponse envoyée !'
				//fetching commentsresp to update the state like that we can see right away the response
				fetch(`https://powerful-everglades-57723.herokuapp.com/commentresponse/${this.props.prm}`)
				.then(response=>{			
					return response.json()
				})
				.then(data=>{			
					this.props.updateCommentResp(data)			
				})
			
			}else{				
				resetField2.value='';				
				responseNotSent.textContent=`La réponse n'a pas pu être envoyée.`
			}
		})	
  }
	

	render(){
		const {comment,name,date,id,onDeleteComment,isAdmIn,isLoggedIn}=this.props;		
		return(
			<div data-aos="fade-in"  data-aos-offset="150" data-aos-duration="800" className='commentStyle' >		
		<div style={{marginLeft:'6%'}}>
				<p><strong>{name}</strong></p>
				<p>{comment}</p>
				<p style={{opacity:'0.5'}}><em><Moment fromNow>{date}</Moment></em></p>
				<div style={{marginTop:'10px',marginBottom:'5px'}}>
				{isAdmIn
					?(<div>
						<button
						className='DelRespCommentStyle'				
						onClick={()=>onDeleteComment(id)}
						>Supprimer</button>
						<button
						className='DelRespCommentStyle'	
						onClick={()=>{this.onCreateResponse(id)}}	
						>Répondre</button>
						</div>
						)
					:   <button
						className='DelRespCommentStyle'	
						onClick={()=>{this.onCreateResponse(id)}}	
						>Répondre</button>
				}				
				</div>
				<div className='commentStyle3'>							
						<div id={`myDIV2${id}`} style={{height:'150px',display:'none',marginRight:'15%',marginLeft:'15%',marginBottom:'-20px'}} >						
							{isLoggedIn
								?(<div>
									<textarea
									id={`responseArea${id}`}
									className='textareaStyle' 
									rows="5" 
									cols="70" 
									style={{height:'80px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto'}}
									onChange={this.onResponseChange}
									>
									</textarea>
									<input
									className='DelRespCommentStyle'	 							 
									type='submit'
									onClick={()=>{this.onResponse(id)}}			
									/>
								</div> )
								:(<div>
									<textarea
									id={`responseArea${id}`}
									className='textareaStyle'
									placeholder='Vous devez être connecté pour envoyer un message.' 
									rows="5" 
									cols="70" 
									style={{height:'80px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto'}}
									onChange={this.onResponseChange}
									>
									</textarea>									
								</div>)
							}										
						</div>
						<span id={`responseSent${id}`} style={{color:'green',marginTop:'10px'}} ></span>
						<span id={`responseNotSent${id}`} style={{color:'red',marginTop:'10px'}} ></span>						
							<div id={`secondDiv2${id}`} style={{marginTop:'10px'}}>							
						</div>
					</div>
		</div>
		<hr style={{width:'70%'}} />	
		</div>
			)
	}
}

export default CommentCard;

