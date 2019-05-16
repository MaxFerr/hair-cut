import React, { Component } from 'react';
import {Redirect,Link} from "react-router-dom";
import './Login.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			isRegister:false,
			EmailErrorLog:true,
			PassErrorLog:true			
		}
	}

	onEmailchange=(event)=>{
		this.setState({email:event.target.value})
		if(event.target.value.split('').filter(x => x === '{').length === 1){
			this.setState({EmailErrorLog:true})
		}else{
			this.setState({EmailErrorLog:false})
		}
	}

	onPasschange=(event)=>{
		this.setState({password:event.target.value})
		if(event.target.value.split('').filter(x => x === '{').length === 1){
			this.setState({PassErrorLog:true})
		}else{
			this.setState({PassErrorLog:false})
		}
	}

	onLogIn=()=>{
		if(this.state.EmailErrorLog || this.state.PassErrorLog){
			console.log('error')
		}else{
			fetch('https://powerful-everglades-57723.herokuapp.com/login',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password
			})
		})
		.then(response=>{				
			return response.json()
		})
		.then(user=>{
			if(user.m_user_id){
				this.props.loadUser(user);
				this.props.checkIfLoggedIn(user);
				this.props.checkIfAdmIn(user);
				this.setState({isRegister:true});
			}else{
				const loginErrorMsg=document.getElementById('loginErrorMsg');
				loginErrorMsg.style.color='red';
				loginErrorMsg.textContent='Mauvais email ou Mot de passe.';
				const pass=document.getElementById('pass');
				pass.value='';
				}				
			})	
		}		
	}
	
	render(){
		if(this.state.isRegister){
			return (
				<Redirect to='/' />
				)
		}else{
			return (
			<div style={{minHeight:'400px'}} className='logStyle' >
			<h1 >Se connecter</h1>			
			<p className='pLogStyle'>Email</p>
			<input
			className='inputLogStype' 
			onChange={this.onEmailchange} 
			type='text' 
			placeholder='Email'/>
			<p className='pLogStyle'>Mot de passe</p>
			<input
			id='pass'
			className='inputLogStype'  
			type='password' placeholder='Mot de passe'
			onChange={this.onPasschange}
			/><br/>
			<Link to={`/ForgotPass`}><p>Mot de passe oublié ?</p></Link>
			<input
			className='submitLog'  
			type='submit' onClick={this.onLogIn} />
			<br/>
			<span id='loginErrorMsg'></span>
			</div>
			)
		}
		
	}
}


export default Login;