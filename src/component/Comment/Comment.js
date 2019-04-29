import React from 'react';
import CommentCard from '../CommentCard/CommentCard.js';
import ResponseCard from '../ResponseCard/ResponseCard.js';

const Comment=({isLoggedIn,isAdmIn,comments,onResponse,commentsresp,user,prm,updateCommentResp,onDeleteComment,onDeleteCommentResp})=>{
	const RespLoop=(params)=>{
			const RepMap=commentsresp.map((commentsresp,i)=>{
				if(commentsresp.comment_id===params){	 			
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
	 			return false
			})
			return RepMap
	 }

	const CommentLoop=comments.map((comment,i)=>{			
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