import React from 'react';
import './ForgotPass.css';


class ForgotPass extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:''			
		}
	}

	onEmailChange =(event)=>{
		this.setState({email:event.target.value})
	}
	
	
	onResetPass=()=>{
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
		if(data==='Wrong email !'){			
				document.getElementById("errorEmail").innerHTML = "Email incorrecte !";
			}else {				
				document.getElementById("correctEmail").innerHTML = "Vérifiez votre boîte mail! Un mail a été envoyé.";
				document.getElementById("forgetDiv").style.display = "none";
				document.getElementById("correctDiv").style.display = "block";
			}
		})
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