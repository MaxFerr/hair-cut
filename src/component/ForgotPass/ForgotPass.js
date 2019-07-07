import React from 'react';
import './ForgotPass.css';


class ForgotPass extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			errorEmailChange:true			
		}
	}

	onEmailChange =(event)=>{
		this.setState({email:event.target.value});
		if(event.target.value.split('').filter(x => x === '{').length >= 1){
			this.setState({errorEmailChange:true});
		}else{
			this.setState({errorEmailChange:false});
		}

	}
	
	
	onResetPass=()=>{
		const errorEmailChangeMsg=document.getElementById("errorEmail");
		const correctEmail=document.getElementById("correctEmail");
		const forgetDiv=document.getElementById("forgetDiv");
		const correctDiv=document.getElementById("correctDiv")
		if(this.state.errorEmailChange){
			errorEmailChangeMsg.innerHTML = "Email incorrecte !";
			errorEmailChangeMsg.style.color='red';
		}else{
			fetch('https://powerful-everglades-57723.herokuapp.com/forgot',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email				
			})
		})
		
	.then(response=>{
		return response.json()
	})
	.then(data=>{
		if(data==="Wrong email !" ||data==="Incorrect info."){			
				errorEmailChangeMsg.innerHTML = "Email incorrecte !";
			}else {				
				correctEmail.innerHTML = "Vérifiez votre boîte mail! Un mail a été envoyé.";
				forgetDiv.style.display = "none";
				correctDiv.style.display = "block";
			}
		})
		}
		
	}
render(){
	return (
		<div style={{minHeight:'300px'}} >
			<div id='correctDiv' className='forgotStyle'>
			<span id='correctEmail' style={{color:'green'}} ></span>
			</div>
			<div id='forgetDiv' >
				<main>
					<div>
						
							<h1>Mot de passe oublié ?</h1>
								<div>
									<label forhtml="email-address">Entrez votre adresse email et vous recevrez un mail sous peu :</label> <br/>
									<div className='input-container'>
									<input
									className='inputForgotStype'									 
									type="email" 
									name="email-address"  
									id="email-address"
									onChange={this.onEmailChange}
									/>
									</div>
								</div>							
								<br/>
							<div>
								<input  
								className='submitForgot'	
								type="submit" value="Reset password"
								onClick={this.onResetPass}
								/>							
						</div>
						<br/><span id='errorEmail' className='red'></span>					
					</div>
				</main>
			</div>
		</div>		
		)
	}
}


export default ForgotPass;