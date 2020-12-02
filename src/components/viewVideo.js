import React from 'react';
import Modal from 'react-awesome-modal';
import { pathOr } from 'ramda';
import Skeleton from 'react-loading-skeleton';
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import ReactPlayer from 'react-player';

const VideoModal = (props) => {
  const { showPopupvideo, onCancel,question} = props;
  console.log('id checking',props)
  return (
    <Modal
      visible={showPopupvideo}
      width="900"
      effect="fadeInUp"
      onClickAway={onCancel}
    >
        
          
        <Card>                  
                <nav class="nav justify-content-center" >
                    <p class="headTitle" >View Steps</p>
                    {/* <p>x</p> */}
                </nav>                   
                <Card.Body >
                    <Row class="row justify-content-center"> 
                    <Col lg={1}>
                    <span  className="numberBg">
                                    <p>{question.id}</p>
                                 </span> 
                    </Col>
                    <Col lg={11} >                                
                        <Form.Group as={Row}>
                            <Col>
                            <p class="Text" >
                                      {pathOr('',['videoData','videoDesc'],question)}
                                     </p> 
                                      
                                       {  <ReactPlayer url={pathOr('',['videoData','videoLink'],question)} /> || <Skeleton  count={10}  /> }
                                    </Col>
                                </Form.Group>
                            </Col>                                         
                    </Row>
                    <Row className="row justify-content-center">
                        
            {/* <button className="btnResult btn-primary" onClick={onCancel}>Cancel</button> */}
                    </Row>
                </Card.Body>
          </Card>
    </Modal>
  );
};
export default VideoModal;