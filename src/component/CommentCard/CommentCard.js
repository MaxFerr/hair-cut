import React, { Component } from 'react';
import './CommentCard.css';
import Moment from 'react-moment';


class CommentCard extends Component{
	constructor(props){
		super(props);
		this.state={
			responseComment:''			
		}
	}

	onCreateResponse=(id)=>{			
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
				const resetField2=document.getElementById(`responseArea${id}`);
				resetField2.value='';
				const responseSent=document.getElementById(`responseSent${id}`);
				responseSent.textContent='Response sent.'
				fetch(`https://powerful-everglades-57723.herokuapp.com/commentresponse/${this.props.prm}`)
				.then(response=>{			
					return response.json()
				})
				.then(data=>{			
					this.props.updateCommentResp(data)			
				})
			
			}else{
				const resetField2=document.getElementById(`responseArea${id}`);
				resetField2.value='';
				const responseNotSent=document.getElementById(`responseNotSent${id}`);
				responseNotSent.textContent='Response could not be sent.'
			}
		})	
  }
	

	render(){
		const {comment,name,date,id,onDeleteComment}=this.props;		
		return(
			<div className='commentStyle' >		
		<div style={{marginLeft:'6%'}}>
				<p><strong>{name}</strong></p>
				<p>{comment}</p>
				<p style={{opacity:'0.5'}}><em><Moment fromNow>{date}</Moment></em></p>
				<div style={{marginTop:'10px',marginBottom:'5px'}}>
				{this.props.isAdmIn
					?(<div>
						<button
						className='DelRespCommentStyle'				
						onClick={()=>onDeleteComment(id)}
						>Delete</button>
						<button
						className='DelRespCommentStyle'	
						onClick={()=>{this.onCreateResponse(id)}}	
						>Response</button>
						</div>
						)
					:   <button
						className='DelRespCommentStyle'	
						onClick={()=>{this.onCreateResponse(id)}}	
						>Response</button>
				}				
				</div>
				<div className='commentStyle3'>							
						<div id={`myDIV2${id}`} style={{height:'150px',display:'none',marginRight:'15%',marginLeft:'15%',marginBottom:'-20px'}} >						
							{this.props.isLoggedIn
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
									placeholder='You need to be logged in to post a message.' 
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

