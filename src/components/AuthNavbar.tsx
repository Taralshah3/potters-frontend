import { useEffect, useState } from 'react';
import { isLoggedIn, logout } from '../auth/helpers'
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import AuthGoogle from '../auth/AuthGoogle';
import { isLoggedInResponse, User } from "../types/constants";
import { Navigate } from 'react-router-dom';

const AuthNavbar = () => {
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        isLoggedIn().then((result: isLoggedInResponse) => {
            if (!result.res) {
                setShouldRedirect(true);
            } else {
                setUser(result.user);
            }
        });
    }, []);

    const logoutClicked = () => {
        logout();
        setShouldRedirect(true);
    }

    if (shouldRedirect) {
        return (
            <Navigate to={"/"} />
        )
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">clay.ai</Navbar.Brand>
                    <Nav>
                        <Button onClick={logoutClicked}>Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet context={{ user: user }} />
        </>
    )

}

export default AuthNavbar