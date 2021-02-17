import React, { Component } from 'react'
import '../App.css'
import {Redirect} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from 'react-otp-input';
import swal from 'sweetalert';
let get =''

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            mobile:'',
            sendOtp:false,
            otp:'',
            login:false
        }
    }
    onReset=()=>{
        this.setState({
            mobile:''
        })
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    sendOtp=()=>{
console.log("ghr",this.state.mobile)
        var phoneno = /^\d{10}$/;
  if(this.state.mobile.match(phoneno))
        {
            let min = Math.floor(111111);
            let max = Math.ceil(999999);
            get = Math.floor(Math.random() * (max - min)) + min;
            this.setState({
                sendOtp:true
            })
            if(get){
                toast("Your six digit OTP is "+get);
                this.setState({
                    otp:get
                })
            }
        }
      else
        {
        swal("Enter a Valid Mobile Number");
        }
       
    }
   
    submit=()=>{
        
        if(this.state.otp===get){
          this.setState({
            login:true
          })
        }
        else{
            swal('Wrong OTP')
        }
    }
    render() {
        console.log("otp",this.state.otp)
        if(this.state.login===true){
            return <div><Redirect to={{pathname: '/home'}} /></div>
            }
        return (
            <div className='login-page'>
                <div className='login-card'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='login-form'>
                                <div className='login-feilds'>
                                {this.state.sendOtp?(
                                    <div>
                                        <div className='login-msg'>Enter Otp</div>
                                        <OtpInput
                                            value={this.state.otp}
                                            onChange={this.onChange}
                                            numInputs={6}
                                            separator={<span>-</span>}
                                            containerStyle='otpbox'
                                            inputStyle='inputotpbox'
                                        />
                                        <div className='login-btn'>
                                            <button onClick={this.submit} >Submit</button>
                                        </div>
                                    </div>
                                ):(
                                    <div>
                                      <div className='login-msg'>Login</div>
                                    <div className='login-label'>Mobile Number</div>
                                    <div id='input'>
                                        <input type="input" placeholder="Enter Mobile Number"  id="inputText"
                                        name="mobile"
                                        value={this.state.mobile}
                                        onChange={this.onChange}
                                        required
                                        />
                                    </div>
                                    <div>
                                    <span  className='login-btn'>
                                        <button onClick={this.sendOtp} >Send OTP</button>
                                    </span>
                                    <span  className='login-btn'>
                                        <button onClick={this.onReset} >Reset</button>
                                    </span>
                                    </div>
                                    </div>
                                )}
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={20000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        />
                                    <ToastContainer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}