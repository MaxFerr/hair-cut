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

	onEmailchange=(event)=>{
		this.setState({email:event.target.value})
		const errorEmail=document.getElementById('errorEmail');			
		if(event.target.value.split('').filter(x => x === '@').length === 1){
			errorEmail.textContent=''
			this.setState({errorEmail:false})
		}else{
			this.setState({errorEmail:true});			
			errorEmail.style.color='red';
			errorEmail.textContent='Invalid email.'
			
		}
	}

	onPasschange=(event)=>{
		this.setState({password:event.target.value})
		const errorPassword=document.getElementById('errorPassword');
		if(event.target.value.length<=5 || event.target.value.split('').filter(x => x === '{').length === 1){
			this.setState({errorPassword:true});			
			errorPassword.style.color='red';
			errorPassword.textContent='Password is too short. You need at least 5 characters.'
			
		}else{
			this.setState({errorPassword:false})
			errorPassword.textContent=''
		}
	}

	onNamechange=(event)=>{
		this.setState({name:event.target.value})
		const errorName=document.getElementById('errorName');		
		if(event.target.value.length<3 || event.target.value.split('').filter(x => x === '{').length === 1){
			this.setState({errorName:true});			
			errorName.style.color='red';
			errorName.textContent='Username is too short. You need at least 3 characters.'
		}else{
			this.setState({errorName:false})						
			errorName.textContent='';
		}
	}

	onRegister=()=>{
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
				this.props.loadUser(user);
				this.props.checkIfLoggedIn(user);
				this.setState({isRegister:true})
			}else{
				return "Email or username already used."
			}				
		})
	}else{
		const invalidForm=document.getElementById('invalidForm');
		invalidForm.style.color='red';
		invalidForm.textContent='Invalid data.';
		}		
	}
	
	render(){
		if(this.state.isRegister){
			return (
				<Redirect to='/' />
				)
		}else{
			return (
				<div className='RegStyle' style={{minHeight:'450px'}} >
					<h1>Register</h1>
					<p className='pRegStyle'>Name </p>
					<input
					className='inputRegStype' 
					onChange={this.onNamechange} 
					type='text' 
					placeholder='Name'/>
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
					<p className='pRegStyle'>Password </p>
					<input className='inputRegStype' type='password' placeholder='Password'
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