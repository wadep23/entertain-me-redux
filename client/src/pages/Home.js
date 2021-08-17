import React from 'react';
import { Redirect } from 'react-router';
import FeedList from '../components/FeedPage';
import { Container, Row } from 'react-bootstrap';
import auth from '../utils/auth';

const HomePage = () => {
    if (!auth.loggedIn()) {
        return <Redirect to ="/" />
    }

    return (
        <main>
            <h1 className="feed-header">Welcome to the Feed page! See what other users have saved recently and check out their profile!</h1>
            <Container>
                <Row>
                <FeedList />
                </Row>
            </Container>
        </main>
    );
};

export default HomePage;