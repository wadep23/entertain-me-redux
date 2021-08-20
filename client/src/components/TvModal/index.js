import { useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useLazyQuery } from "@apollo/client";
import { TRAILER_API_QUERY } from "../../utils/queries";

const TvModal = (props) => {
    const { showTvTrailerModal, setShowTvTrailerModal, tvTrailerModalTitle } = props;
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
          show={showTvTrailerModal}
          onHide={() => setShowTvTrailerModal(false)}
          aria-labelledby="trailer-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{tvTrailerModalTitle}</Modal.Title>       
          </Modal.Header>
          <Modal.Body>
            <div className="video-box">
              <iframe title="youtube" dialogueClassName="video" 
              id="video" className="video"></iframe>   
            </div>   
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => getTrailer({ variables: { mediaTitle: tvTrailerModalTitle }})}>Show Me The Trailer!</Button>     
          </Modal.Footer>         
          </Modal>
      </>                           
    )                               
};

export default TvModal;