import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import AuthGoogle from '../auth/AuthGoogle';
import { Navigate } from 'react-router-dom';
import { isLoggedInResponse } from "../types/constants";

import { isLoggedIn } from '../auth/helpers';
import Button from 'react-bootstrap/Button';




const NoAuthNavbar = () => {

    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


    useEffect(() => {
        isLoggedIn().then((result: isLoggedInResponse) => {
            if (result.res) {
                setIsAuthenticated(true);
            }
        });
    }, []);


    if (shouldRedirect) {
        return (
            <Navigate to={'/user/dashboard'} />
        )
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >clay.ai </Navbar.Brand>
                    {(isAuthenticated)
                        ?
                        <Button
                            onClick={() => { setShouldRedirect(true) }} variant="dark">
                            Dashboard
                        </Button>
                        :
                        <AuthGoogle
                            redirect={setShouldRedirect}
                        />
                    }
                </Container>
            </Navbar>
            <Outlet context={{ isAuthenticated: isAuthenticated, setShouldRedirect: setShouldRedirect }} />
        </>
    )

}

export default NoAuthNavbar;