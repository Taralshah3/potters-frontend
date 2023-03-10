import { useState, useEffect } from 'react';
import "../styles/Home.css";
import { Navigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import AuthGoogle from '../auth/AuthGoogle';



const Home = () => {
    //@ts-ignore
    const { isAuthenticated, setShouldRedirect } = useOutletContext()


    return (
        <div className="Home">
            <div className="Home-conent">
                <h1>Explain Less. Code More. Onboard Faster.</h1>
                {
                    (isAuthenticated)
                        ?
                        <button className="getStart-home" onClick={() => { setShouldRedirect(true) }}>Hop In</button>
                        :
                        <AuthGoogle
                            class="getStart-home"
                            redirect={setShouldRedirect}
                        />
                }
            </div>
        </div>
    )
}

export default Home;