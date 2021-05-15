import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import LinkForm from './components/linkform/linkform';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import './App.css';
import RecogitionFace from './components/recogitionFace/recogitionFace';
import Signin from './components/signin/signin';
import Register from './components/register/register';

// we only can communicate with http if we have cors because the browser doesn't trust anything
const getData = () =>{
  fetch('https://guarded-reef-86975.herokuapp.com/').then(response => response.json())
  .then(console.log);
}
getData();

const BackgroundParticle = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: false,
        value_area: 800
      },
    },
  },
  interactivity: {
    detect_on: window,
    events:{
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  },
  modes: {
    repulse: {
      distance: 200
    }
  }
}
const intitalState = {
    input : '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: true,
    user: {
      id: '',
      name: '',
      email: '',
      entries: '',
      joined: ''
    }
}
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: true,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
    }
  }
  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  // calculate the box we need
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  // display the box
  displayFaceBox = (box) =>{
    this.setState({box: box});
  }
  // set event with on
  onInputChange = (event) =>{
    this.setState({
      input: event.target.value,
    })
  }
  onSignIn = (routeChange) =>{
    if(routeChange === 'signout'){
      this.setState({isSignedIn: false});
    }
    else if(routeChange === 'register'){
      this.setState({isSignedIn: true});
    }
    else{
      this.setState(intitalState);
    }
    this.setState({route: routeChange});
  }
  onSubmit = () =>{
    // promise
    this.setState({imageUrl: this.state.input});
    fetch('https://guarded-reef-86975.herokuapp.com/imageURL', {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
    .then(response =>{
      if(response){
        fetch('https://guarded-reef-86975.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
          // update count number when we success
        }).then(response => response.json()).then(result => {
          // first param => target object, second param => what we want to extends
          this.setState(Object.assign(this.state.user, {entries: result}))
        }).catch(err => console.log('error'));
      }
       this.displayFaceBox(this.calculateFaceLocation(response));  
    }).catch(err => console.log(err));
  }
    render(){
      return(
        <div>
              <Particles className="Particle"
                  params={BackgroundParticle} />
              <Navigation isSignedIn={this.state.isSignedIn} onSignin={this.onSignIn}/>
              {/* wrap in bracket to use JSX and JS */}
              {
                this.state.route === 'signout' ? 
                <div>
                  <Logo/>
                  <Rank name={this.state.user.name} rank={this.state.user.entries}/>
                  <LinkForm onSubmit = {this.onSubmit} onInputChange = {this.onInputChange}/>
                  <RecogitionFace box={this.state.box} url={this.state.imageUrl}/>
                </div>
                :(
                  this.state.route === 'register' ? <Register loadUser={this.loadUser} onSignIn = {this.onSignIn}/> : <Signin loadUser={this.loadUser} onSignIn = {this.onSignIn}/>
                )
              }
            {/* set the props in here to the children get state from parent as props */}
        </div>
      )
    }
}
export default App;