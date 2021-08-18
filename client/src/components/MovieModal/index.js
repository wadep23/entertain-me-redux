import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useLazyQuery } from "@apollo/client";
import { TRAILER_API_QUERY } from "../../utils/queries";

const MovieModal = (props) => {
    const { showMovieTrailerModal, setShowMovieTrailerModal, movieTrailerModalTitle } = props;
    const [getTrailer, { loading, data }] = useLazyQuery(TRAILER_API_QUERY);
    
    useEffect(() => {
        if (data) {
            document.getElementById('video').src = `https://www.youtube.com/embed/${data.trailer.videoId}`
        }
    });

    if (loading) {
      return <div>Loading...</div>
    }
  
    return (
      <>
        <Modal
          size="lg"
          show={showMovieTrailerModal}
          onHide={() => setShowMovieTrailerModal(false)}
          aria-labelledby="trailer-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{movieTrailerModalTitle}</Modal.Title>       
          </Modal.Header>
          <Modal.Body>
            <div className="video-box">
              <iframe title="youtube" dialogueClassName="video" 
              id="video" className="video"></iframe>   
            </div>   
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => getTrailer({ variables: { mediaTitle: movieTrailerModalTitle }})}>Show Me The Trailer!</Button>     
          </Modal.Footer>         
          </Modal>
      </>                           
    )                               
};

export default MovieModal;