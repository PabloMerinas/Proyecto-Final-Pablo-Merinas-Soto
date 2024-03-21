import React, { useState } from 'react';
import "./style.css";


export const Register = () => {

    return (
        <>
          <div className="divRegister">
            <div className="div-2">Create an account</div>
            <div className="div-3">Email</div>
            <div className="div-4">you@example.com</div>
            <div className="div-5">Username</div>
            <div className="div-6">username</div>
            <div className="div-7">Password</div>
            <div className="div-8">password</div>
            <div className="div-9">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2596886a8268e595a42426b150237f61f49437d1dd4f8c8166519fb7aa500f65?"
                className="img"
              />
              <div className="div-10">I agree to the terms and conditions.</div>
            </div>
            <div className="div-11">
              <div className="div-12">Create account</div>
            </div>
          </div>
        </>
      );
    }
    
    