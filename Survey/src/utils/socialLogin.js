import React from 'react'

import { useNavigate } from "react-router-dom";

export default function socialLogin() {
  
  return (
    <div>socialLogin</div>
  )
}


export function SocialLogin(provider){
  
  const navigate = useNavigate();
  
        navigate('/mypage');
    }
    //wind ow.location.href = API_BASE_URL + "/auth/authorize/" + provider + "?redirect_url=" + window.location.origin;

