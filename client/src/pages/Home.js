import React from 'react';
import FeedList from '../components/FeedPage';
import { Container, Row } from 'react-bootstrap';

const HomePage = () => {

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