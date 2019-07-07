import React from 'react';
import CommentCard from '../CommentCard/CommentCard.js';
import ResponseCard from '../ResponseCard/ResponseCard.js';

const Comment=({isLoggedIn,isAdmIn,comments,onResponse,commentsresp,user,prm,updateCommentResp,onDeleteComment,onDeleteCommentResp})=>{
	//making a loop in a loop to display comments and the corresponding commentsResp
	const RespLoop=(params)=>{
			const RepMap=commentsresp.map((commentsresp,i)=>{
				//if comments got resp -- 
				if(commentsresp.comment_id===params){
				// loop thru all the commentsresp where they have a corrsponding id and create a responseCard for each commentsResp	 			
	 			return (
	 					<ResponseCard
						key={i}
						resp={commentsresp.resp}
						name={commentsresp.name}
						date={commentsresp.added}				
						comment_id={commentsresp.comment_id}
						id={commentsresp.m_commentresp_id}
						onDeleteCommentResp={onDeleteCommentResp}
						isAdmIn={isAdmIn}						
						/>
	 				)
	 			}
	 			//if there are no commentsResp return false and stop the loop
	 			return false
			})
			//else we return the result of the loop
			return RepMap
	 }

	const CommentLoop=comments.map((comment,i)=>{
	//looping thru all the comments and creating a commentCard for each comments
	//looping thru the commentsResp and display them			
					return (
						<div key={i}>						
						<CommentCard
							key={i}
							comment={comment.comment}
							name={comment.name}
							date={comment.added}				
							id={comment.m_comment_id}
							onResponse={onResponse}
							user={user}
							prm={prm}
							updateCommentResp={updateCommentResp}
							onDeleteComment={onDeleteComment}
							isAdmIn={isAdmIn}
							isLoggedIn={isLoggedIn}
						/>						
						{RespLoop(comment.m_comment_id)}
						</div>
						)			
				})
	
	return (
		<div style={{minHeight:'50px'}} >
		{CommentLoop}
		</div>
		)
	
}

export default Comment;