import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import NavigationBar from '../components/NavigationBar';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
import FaceRecognition from '../components/FaceRecognition.js';
import Clarifai  from 'clarifai';
import Signin from '../components/Signin';
import Register from '../components/Register';

//verifying Clarifai
 
const app = new Clarifai.App({
 apiKey: 'a833a7a308aa49c18a17557f04ebbad3'
});
//verification completed

const initialState = {
  input:'',
  imageUrl:"",
  box:{},
  route:'signin',
  isSignedIn : false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}



class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

       
        
  loadUser = (data) => {        
    this.setState({user:{
      id:data.id,        
      name:data.name,         
      email:data.email,        
      entries:data.entries,        
      joined:data.joined        
    }
    })        
    console.log(data);        
        
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol:   clarifaiFace.left_col * width,
      topRow:    clarifaiFace.top_row * height,
      rightCol:  width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  } 

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('https://aqueous-woodland-95737.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

onRouteChange = (route) =>{
  if(route === 'signout'){
    this.setState(initialState);
  }else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route:route});
}
  

  render() {
    
    var { isSignedIn,imageUrl,route,box } = this.state;

    return (
          <div>
            <NavigationBar onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
            {
              route === "home"  ?
              <div>
                  <Logo />
                  <Rank name={this.state.user.name}
                      entries={this.state.user.entries}
                      loadUser={this.loadUser}
                  />
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                  <FaceRecognition imageUrl={imageUrl} box ={box} /> 
                </div>
                :(route === "signin") ?
                  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  
                
            }
            
            
          </div>
    )
}

}

export default App;
