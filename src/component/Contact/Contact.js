import React from 'react';
import './Contact.css';


class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      message:'',
      name:''
    }
  }

  onEmailChange=(event)=>{
    this.setState({email:event.target.value})
  }
  onNameChange=(event)=>{
    this.setState({name:event.target.value})
  }
  onMessageChange=(event)=>{
    this.setState({message:event.target.value})
  }

  
  onSubmit=()=>{
    const sendMaillErr=document.getElementById('sendMaillErr');
      if(this.state.email==='' || this.state.message==='' || this.state.name==='' ){
         sendMaillErr.style.color="red"         
          sendMaillErr.innerHTML="Vous devez complèter tous les champs !"              
      }else{                
        fetch('https://powerful-everglades-57723.herokuapp.com/sendmail',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            email:this.state.email,
            message:this.state.message,
            name:this.state.name,
            user:this.props.user.id
          })
        })
        .then(response=>{       
          return response.json()
        })
        .then(resp=>{          
          if(resp==='email sent'){
            sendMaillErr.style.color="green"          
            sendMaillErr.innerHTML="Email envoyé !"
          }else {
            sendMaillErr.style.color="red"
            sendMaillErr.innerHTML="L'email n'a pas pu être envoyé."
            }
                
        })      
      }
    }

  render(){    
      return(
          <div style={{minHeight:'400px'}} >        
          <div  className='contactStyle'>
              <h1 >Contact</h1>
              <hr />              
                <div >                
                  <input className='iptStyle' type="text" name="name" placeholder='Nom' 
                  onChange={this.onNameChange}
                  />
                  <br/>                  
                  <input style={{marginTop:'-30px'}} className='iptStyle' type="text" name="mail" placeholder='Email'
                  onChange={this.onEmailChange}
                  />
                  <br/>
                  <div>
                  {this.props.isLoggedIn
                    ?<div>
                      <textarea
                      className='textareaStyle' 
                      onChange={this.onMessageChange}                     
                      id="myText" 
                      placeholder='Votre Message'
                      rows="5" 
                      cols="45" 
                      style={{height:'70px',marginTop:'-30px',background:'#1E242C'}}              
                      >
                      </textarea>                
                      <input className='iptStyle2' type="submit" value="Envoyer"
                       onClick={this.onSubmit}
                      />                  
                    </div>
                    :<div>
                      <textarea
                      className='textareaStyle' 
                      onChange={this.onMessageChange}                     
                      id="myText" 
                      placeholder='Votre Message'
                      rows="5" 
                      cols="45" 
                      style={{height:'70px',marginTop:'-30px',background:'#1E242C'}}              
                      >
                      </textarea>                
                      <p style={{color:'red'}} >Vous devez être connecté pour m'envoyer un message.</p>
                    </div>
                  }
                  </div>                  
                </div>
                <span id='sendMaillErr'></span>                  
              </div> 
      </div>
      )
    }   
  }

  export default Contact;


