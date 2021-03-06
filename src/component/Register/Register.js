import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import './Register.css';

class Register extends Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			name:'',
			isRegister:false,
			errorName:true,
			errorEmail:true,
			errorPassword:true,			
		}
	}

	check=(event)=>{
		if(event.split('').filter(x => x === '{').length >= 1){
				return true
			}else{
				return false
			}
	}

	onEmailchange=(event)=>{
		this.setState({email:event.target.value})
		const errorEmail=document.getElementById('errorEmail');
		if (this.check(event.target.value)){
			errorEmail.style.color='red';
			errorEmail.textContent='Email invalide.'
			this.setState({errorEmail:true});
		}else{
			if(event.target.value.split('').filter(x => x === '@').length === 1){
			errorEmail.textContent=''
			this.setState({errorEmail:false})
		}else{
			this.setState({errorEmail:true});			
			errorEmail.style.color='red';
			errorEmail.textContent='Email invalide.'
			
		}
		}			
		
	}

	onPasschange=(event)=>{
		this.setState({password:event.target.value})
		const errorPassword=document.getElementById('errorPassword');
		if(event.target.value.length<=5 || this.check(event.target.value)){
			this.setState({errorPassword:true});			
			errorPassword.style.color='red';
			errorPassword.textContent=`Le mot de passe est trop court. Vous avez besoin d'au moins 5 caractères.`
			
		}else{
			this.setState({errorPassword:false})
			errorPassword.textContent=''
		}
	}

	onNamechange=(event)=>{
		this.setState({name:event.target.value})
		const errorName=document.getElementById('errorName');		
		if(event.target.value.length<3 || this.check(event.target.value)){
			this.setState({errorName:true});			
			errorName.style.color='red';
			errorName.textContent=`Le nom d'utilisateur est trop court. Vous avez besoin d'au moins 3 caractères.`
		}else{
			this.setState({errorName:false})						
			errorName.textContent='';
		}
	}

	onRegister=()=>{
		const {loadUser,checkIfLoggedIn}=this.props;
		const invalidForm=document.getElementById('invalidForm');
	if(!this.state.errorName && !this.state.errorPassword && !this.state.errorEmail){
		fetch('https://powerful-everglades-57723.herokuapp.com/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name:this.state.name
			})
		})
		.then(response=>{				
			return response.json()
		})
		.then(user=>{
			if(user.m_user_id){
				loadUser(user);
				checkIfLoggedIn(user);
				this.setState({isRegister:true})
			}else{
				invalidForm.style.color='red';
				invalidForm.textContent='Email ou nom d\'utilisateur déja utilisé.';
				return "Email or username already used."
			}				
		})
	}else{		
		invalidForm.style.color='red';
		invalidForm.textContent='Données invalides.';
		}		
	}

	onRegPress=(events)=>{
    if (events.charCode===13){
      this.onRegister()    
  		}
	}
	
	render(){
		const {isRegister}=this.state;
		if(isRegister){
			return (
				<Redirect to='/' />
				)
		}else{
			return (
				<div className='RegStyle' style={{minHeight:'450px'}} >
					<h1>S'enregister</h1>
					<p className='pRegStyle'>Nom </p>
					<input
					className='inputRegStype' 
					onChange={this.onNamechange} 
					type='text' 
					placeholder='Nom'/>
					<br/>
					<span id='errorName'></span>			
					<p className='pRegStyle'>Email </p>
					<input
					className='inputRegStype' 
					onChange={this.onEmailchange} 
					type='text' 
					placeholder='Email'/>
					<br/>
					<span id='errorEmail'></span>
					<p className='pRegStyle'>Mot de passe </p>
					<input className='inputRegStype' type='password' placeholder='Mot de passe'
					onKeyPress={this.onRegPress}
					onChange={this.onPasschange}
					/>
					<br/>
					<span id='errorPassword'></span>
					<br/>
					<input  className='submitReg' onClick={this.onRegister} type='submit'/>
					<br/>
					<span  id='invalidForm'></span>					
				</div>
			)
		}
	}
}


export default Register;