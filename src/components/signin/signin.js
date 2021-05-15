import React from 'react'
import './signin.css'
// to use event from other js file we need to use this.props => to use this.props we have to use props inside constructor
// and super
class Signin extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value});
    }
    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value});
    }
    // fetch data from server to check
    // Basically, fetch is get request but we sign in, we have password => post request to send through the body
    // so in fetch we have second parameter is an object
    onSubmitSignin = () =>{
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            // send data to backend using body but we have to convert to stringify to use
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                this.props.loadUser(result);
                this.props.onSignIn('signout'); 
            }
        });
    }
    render(){
        return (
            <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="pa4 black-80">
                    <div className="measure center form-center-all">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        {/* do arrow function to make it become call back function */}
                        <input onClick={this.onSubmitSignin} className="w-100 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => this.props.onSignIn('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;