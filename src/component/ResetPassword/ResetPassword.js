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

	check=(event)=>{
		if(event.split('').filter(x => x === '{').length >= 1){
				return true
			}else{
				return false
			}
	}

	onPasswordChange=(event)=>{
		this.setState({passwordChange:event.target.value})
		if(event.target.value.length < 6 && this.check(event.target.value) ){
			this.setState({errorPassword:false});
		}else{
			this.setState({errorPassword:true});
		}
	}

	onPasswordChangeConfirm=(event)=>{
		this.setState({passwordChangeConfirm:event.target.value})
		if(event.target.value.length < 6 && this.check(event.target.value)){
			this.setState({errorPassword:false});
		}else{
			this.setState({errorPassword:true});
		}
	}

	onChangePassword=()=>{
		const a=document.getElementById('noMatch');
		const b=document.getElementById('errorPasswordMsg');
		if(!this.state.errorPassword){
			b.innerHTML="Mauvaises informations."
		}else{
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
			b.innerHTML="Le mot de passe doit comporter au moins 6 caractères."
		}else{
			b.innerHTML=""
		}if(this.state.passwordChange!==this.state.passwordChangeConfirm) {
			a.innerHTML="Les mots de passe ne correspondent pas.";
		}else{
			a.innerHTML=""
			}
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
		const {isPassChanged,isValidToken}= this.state;
		if(!isPassChanged){
			if(isValidToken){
				return (			
					<div id='forgetDiv' style={{width: 'auto' ,height: '350px'}}>
					<h1 >Changer votre mot de passe</h1>
					<div className="ResetStyle">
					<p className='pResetStyle' >Nouveau mot de passe</p>
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
					<p className='pResetStyle'>Confirmez le mot de passe</p>
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
					<p style={{color:'red'}}>Le token de réinitialisation du mot de passe est invalide ou a expiré.</p>
					</div>
					)
			}
		}else{
			return (
				<div id='correctDiv' style={{width: 'auto' ,minHeight: '300px'}}>
				<p style={{color:'green'}} >Le mot de passe a été changé.</p>
				</div>
				)
		}
	}
}


export default ResetPassword;