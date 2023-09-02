import React from 'react';
import {GoogleLogin} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log('getting response in loginjs');
    console.log(response);
    try {
      const resOBJ={
        name:"Pranav",
        googleId:"somegoogleid",
        imageUrl:"https://yt3.googleusercontent.com/ytc/AOPolaQW6Npc3niBDBoq43f-fkJbscJ1PEqjrlaDILCScg=s176-c-k-c0x00ffffff-no-rj"
      }
    localStorage.setItem('user', JSON.stringify(resOBJ));
    console.log('localstoreage');
    console.log(localStorage);
    const { name, googleId, imageUrl } = resOBJ;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
    } catch (error) {
      console.log('getting error in catch');
      console.log(error);
    }
  };

  const loginFailed=(res)=>{
      console.log('login failed');
      console.log(res);
  };


  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <button
            style={{"background":'white'}}
            onClick={responseGoogle}
            >Login With Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
