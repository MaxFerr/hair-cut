import React from 'react';
import './ResetPassword.css';


class ResetPassword extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isValidToken:false,
			passwordChange:'',
			passwordChangeConfirm:'',
			errorPassword:false,
			isPassChanged:false		
		}
	}

	onPasswordChange=(event)=>{
		this.setState({passwordChange:event.target.value})
		if(event.target.value.length < 6){
			this.setState({errorPassword:false});
		}else{
			this.setState({errorPassword:true});
		}
	}

	onPasswordChangeConfirm=(event)=>{
		this.setState({passwordChangeConfirm:event.target.value})
		if(event.target.value.length < 6){
			this.setState({errorPassword:false});
		}else{
			this.setState({errorPassword:true});
		}
	}

	onChangePassword=()=>{
		const a=document.getElementById('noMatch');
		const b=document.getElementById('errorPasswordMsg');
		if(this.state.passwordChange===this.state.passwordChangeConfirm && this.state.errorPassword ){
			a.innerHTML="";
			fetch('https://powerful-everglades-57723.herokuapp.com/updatePassword',{
				method:'put',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					resetpasstoken:this.props.match.params.token,
					password:this.state.passwordChangeConfirm
				})
			}).then(response=>{
				return response.json()
			}).then(data=>{
				if(data.email){
					this.setState({isPassChanged:true})
				}else{
					this.setState({isPassChanged:false})
				}
			})			
		}if(!this.state.errorPassword) {
			b.innerHTML="Password should be at least 6 characters long."
		}else{
			b.innerHTML=""
		}if(this.state.passwordChange!==this.state.passwordChangeConfirm) {
			a.innerHTML="Passwords doesn't match.";
		}else{
			a.innerHTML=""
		}
	}
	
	componentDidMount(){
		fetch(`https://powerful-everglades-57723.herokuapp.com/resetPass/${this.props.match.params.token} `)
		.then(response=>{			
			return response.json()
		})
		.then(data=>{			
			if(data.email){
				this.setState({isValidToken:true})
			}else{
				this.setState({isValidToken:false})
			}						
		})
	}
	
	render(){
		if(!this.state.isPassChanged){
			if(this.state.isValidToken){
				return (			
					<div id='forgetDiv' style={{width: 'auto' ,height: '350px'}}>
					<h1 >Change your password</h1>
					<div className="ResetStyle">
					<p className='pResetStyle' >New password</p>
					<input 
					className="inputResetStype" 
					type="password" 
					name="password"  								
					onChange={this.onPasswordChange}
					/>
					<span id='errorPasswordMsg' style={{color:'red'}}></span>								
					</div>
					<div >					
					<div className="ResetStyle">
					<p className='pResetStyle'>Confirm password</p>
					<input
					className="inputResetStype"  					 
					type="password" 
					name="password"  								
					onChange={this.onPasswordChangeConfirm}					
					/>
					</div>
					<span id='noMatch' style={{color:'red'}}></span>									
					</div>					
					<br/>
					<div>
					<input 
					className='submitReset' 
					type="submit" value="Reset password"
					onClick={this.onChangePassword}
					/>							
					</div>				
					</div>
					)
			}else{
				return (
					<div id='correctDiv' style={{width: 'auto' ,minHeight: '300px'}}>
					<p style={{color:'red'}}>Password reset token is invalid or has expired.</p>
					</div>
					)
			}
		}else{
			return (
				<div id='correctDiv' style={{width: 'auto' ,minHeight: '300px'}}>
				<p style={{color:'green'}} >Password has been changed.</p>
				</div>
				)
		}
	}
}


export default ResetPassword;