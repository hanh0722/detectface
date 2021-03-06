import React from 'react'
import '../signin/signin.css';
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nameSignUp: '',
            emailSignUp: '',
            passwordSignUp: ''
        }
    }
    onNameSignUp = (event) =>{
        this.setState({nameSignUp: event.target.value});
    }
    onEmailSignUp = (event) =>{
        this.setState({emailSignUp: event.target.value});
    }
    onPasswordSignUp = (event) =>{
        this.setState({passwordSignUp: event.target.value});
    }
    // send data to the body
    onSignUp = () =>{
        fetch('https://guarded-reef-86975.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.nameSignUp,
                email: this.state.emailSignUp,
                password: this.state.passwordSignUp
            })
        }).then(response => response.json())
        .then(user =>{
            // function to loaduser in front end
            if(user.id){
                this.props.loadUser(user);
                this.props.onSignIn('signin');
            }
        })
    }
    render(){
        return (
            <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure center form-center-all">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input onChange={this.onNameSignUp} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailSignUp} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordSignUp} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        {/* do arrow function to make it become call back function */}
                        <input onClick={this.onSignUp} className="w-100 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Register;