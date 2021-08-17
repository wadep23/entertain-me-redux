import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { QUERY_POSTS } from '../../utils/queries';
import auth from '../../utils/auth';

const FeedList = (props) => {
    
    const { loading, data: postData } = useQuery(QUERY_POSTS);

    if (!auth.loggedIn()) {
        return <Redirect to ="/" />
    }
    
    if (loading) {
        return <h1>Loading data...</h1>
    }

    return (
        <Col className="post-outer">
            {auth.loggedIn() && (
                postData.posts.map(post => (
                    <div key={post.id} className="post-box">
                        <p><Link className="name-link"
                                to={`/profile/${post.username}`}
                                style={{ fontWeight: 700 }}
                            >
                                {post.username}    
                            </Link>{' '}

                            {post.postText + '  '} posted on {post.createdAt} 
                        </p>
                    </div>    
                ))
            )}        
        </Col> 
    );
};

export default FeedList;