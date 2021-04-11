import React from 'react';
import { useHistory } from "react-router-dom";

export const Callback = () => {
    const hash = window.location.hash.substr(1);
    const parts = hash.split('=');
    const rawToken = parts[1];
    window.sessionStorage.setItem("token", rawToken);
    const history = useHistory();
    setTimeout(() => {
        history.push(`/`);
      }, 3000);
    

    return (
        <div>Login Success! You will be redirect soon...</div>
    )
}
