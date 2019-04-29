import React from 'react';
import './ResponseCard.css';
import ico from '../../icon1.png';
import Moment from 'react-moment';


const ResponseCard=({resp,name,date,id,onDeleteCommentResp,isAdmIn})=>{	
	return (
		<div className='responseStyle' >
		<img src={ico} style={{float:'left',marginLeft:'6%',marginTop:'-3px'}} alt='arrow' ></img>				
		<div style={{marginLeft:'15%'}}>		
				<p><strong>{name}</strong></p>
				<p style={{marginTop:'-10px'}}>{resp}</p>
				{isAdmIn
					?(<div>
						<p style={{marginTop:'-5px',opacity:'0.5'}}><em><Moment fromNow>{date}</Moment></em></p>				
						<button
						className='DelRespStyle'
						onClick={()=>{onDeleteCommentResp(id)}}
						>Delete</button>
						</div>
						)
					:<p style={{marginTop:'-5px',opacity:'0.5'}}><em><Moment fromNow>{date}</Moment></em></p>
				}				
				<div style={{marginTop:'10px',marginBottom:'5px'}} >				
				</div>								
		</div>
		<hr style={{width:'40%'}} />	
		</div>
		)
	
}

export default ResponseCard;