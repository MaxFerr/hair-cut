import React, { Component } from 'react';
import './App.css';
import TopNavBar from './component/TopNavBar/TopNavBar.js';
import Title from './component/Title/Title.js';
import MainNavBar from './component/MainNavBar/MainNavBar.js';
import ArticleCard from './component/ArticleCard/ArticleCard.js';
import MoreInfo from './component/MoreInfo/MoreInfo.js';
import Footer from './component/Footer/Footer.js';
import Login from './component/Login/Login.js';
import Beginner from './component/Beginner/Beginner.js';
import Hair from './component/Hair/Hair.js';
import About from './component/About/About.js';
import Contact from './component/Contact/Contact.js';
import ArticleInfo from './component/ArticleInfo/ArticleInfo.js';
import AddArticle from './component/AddArticle/AddArticle.js';
import Register from './component/Register/Register.js';
import {Route} from "react-router-dom";
import DeleteArticle from './component/DeleteArticle/DeleteArticle.js';
import ModifArticle from './component/ModifArticle/ModifArticle.js';
import ForgotPass from './component/ForgotPass/ForgotPass.js';
import ResetPassword from './component/ResetPassword/ResetPassword.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      article:[],
      search:'',     
      singleArticle:'',
      user:{
        name:'',
        email:'',
        joined:'',
        id:''
      },
      isLoggedIn:false,
      isAdmIn:false
    }
  }

  onUpdateArticle=(data)=>{
    this.setState({article:data})
  }

  loadUser=(data)=>{
     this.setState({user:{
        name:data.name,
        email:data.email,
        joined:data.joined,
        id:data.m_user_id
      }}) 
  }

  checkIfAdmIn=(data)=>{
  fetch(`https://powerful-everglades-57723.herokuapp.com/admin/${data.m_user_id}`)
  /*send in the query string data.m_user_id and then check if its the admin server side*/
  .then(response=>{
      return response.json()
    })
    .then(adminId=>{
      if(data.m_user_id===Number(adminId)){
      this.setState({isAdmIn:true})
    }else{
      this.setState({isAdmIn:false})
    }           
    })
  }

  checkIfLoggedIn=(data)=>{
    if(this.state.user.email===data.email){
      this.setState({isLoggedIn:true})
    }else{
      this.setState({isLoggedIn:false})
    }
  }

  onClickLogout=()=>{
    this.setState({isLoggedIn:false});
    this.setState({isAdmIn:false});
    this.setState({user:{
      id:'',
      name:'',
      email:'',
      joined:''
    }});    
  }

  onSearchChange=(param)=>{
    this.setState({search:param})
  }
  
  onChangeRoute=(route)=>{
    this.setState({route:route})
  }

  onClickArticle=(param)=>{
    for (var i = 0; i < this.state.article.length; i++) {
      if(this.state.article[i].m_article_id===param){        
        this.setState({singleArticle:{
              id:this.state.article[i].m_article_id,
              title:this.state.article[i].title,
              secondtitle:this.state.article[i].secondtitle,
              text:this.state.article[i].text,
              image:this.state.article[i].image,
              added:this.state.article[i].added,
              favorite: this.state.article[i].favorite
           }})          
      }
    }
  }

  componentDidMount(){    
    fetch('https://powerful-everglades-57723.herokuapp.com/').then(response=>{
      return response.json()
    })
    .then(article=>{
      this.setState({article:article})     
    })    
  }

  render() {
    const filteredArticle=this.state.article.filter(article=>{
      return article.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1
    })
    return (
      <div className="App">
        <TopNavBar user={this.state.user} isLoggedIn={this.state.isLoggedIn} onClickLogout={this.onClickLogout} onChangeRoute={this.onChangeRoute}/>
        <Title isAdmIn={this.state.isAdmIn}/>
        <div className='mainStyle'>
        <MainNavBar  onSearchChange={this.onSearchChange} onChangeRoute={this.onChangeRoute}/>
        {this.state.article.length<1
          ?<div>          
          <Route path="/" exact render={(props)=>
            <div className='cont' >
            <p style={{color:'gray'}} >Loading<span className='loadingDot'>.</span><span className='loadingDot'>.</span><span className='loadingDot'>.</span></p>
            <MoreInfo/>
            </div>
            }/>     
          </div>
          :<div>
            <Route path="/" exact render={(props)=>
            <div className='cont' >
            <ArticleCard articles={filteredArticle} isLoggedIn={this.state.isLoggedIn} isAdmIn={this.state.isAdmIn} onClickArticle={this.onClickArticle} />
            <MoreInfo/>
            </div>
            }/>        
          </div>
        }       
        <Route path="/Login" exact render={(props)=><Login loadUser={this.loadUser} checkIfLoggedIn={this.checkIfLoggedIn} checkIfAdmIn={this.checkIfAdmIn} />}/>
        <Route path="/Register" exact render={(props)=><Register loadUser={this.loadUser} checkIfLoggedIn={this.checkIfLoggedIn} />}/> 
        <Route path="/Beginner" exact render={(props)=><Beginner/>}/>
        <Route path="/Hair" exact render={(props)=><Hair/>}/>
        <Route path="/About" exact render={(props)=><About/>}/>
        <Route path="/Contact" exact render={(props)=><Contact user={this.state.user} isLoggedIn={this.state.isLoggedIn} />}/>
        <Route path={`/ArticleInfo/:id`} exact render={(props)=><ArticleInfo {...props} isAdmIn={this.state.isAdmIn} singleArticle={this.state.singleArticle} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />}/>
        <Route path="/AddArticle" exact render={(props)=><AddArticle onUpdateArticle={this.onUpdateArticle} isAdmIn={this.state.isAdmIn} user={this.state.user} />}/>
        <Route path={`/DeleteArticle/:id`} exact render={(props)=><DeleteArticle {...props} isAdmIn={this.state.isAdmIn} singleArticle={this.state.singleArticle} onUpdateArticle={this.onUpdateArticle} user={this.state.user} />}/>
        <Route path={`/ModifArticle/:id`} exact render={(props)=><ModifArticle {...props} onUpdateArticle={this.onUpdateArticle} isAdmIn={this.state.isAdmIn} singleArticle={this.state.singleArticle} user={this.state.user}/>}/>
        <Route path="/ForgotPass" exact render={(props)=><ForgotPass/>}/>
        <Route path="/ResetPassword/:token" exact component={ResetPassword}/>
        </div>
        <Footer/>      
      </div>      
      );
  }
}

export default App;
