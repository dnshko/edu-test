import React from 'react';
import Modal from 'react-awesome-modal';
import { pathOr } from 'ramda';
import {
    Container,
    Card,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';

const StepsModal = (props) => {
  const { showPopup, onCancel,question } = props;
  const steps = pathOr([],['stepsData','steps'],question);
  console.log(question,'question')

  const renderSteps = steps.map((data,index)=>{

     return( <div key={index}>
      <Button className="btn btn-primary" style={{background: '#21234E'}}>Step {index +1} </Button>
      <p class="Text" >{data}</p>
      </div>)
    })
  console.log(renderSteps)
  return (
    <Modal
      visible={showPopup}
      width="900"
      effect="fadeInUp"
      onClickAway={onCancel}
    >
     
          
          <Card>                  
                <nav class="nav justify-content-center" >
                    <p class="headTitle" >View Steps</p>
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
                                      {pathOr('',['stepsData','stepDesc'],question)}
                                     </p> 
                                         {renderSteps}         
                                    </Col>
                                </Form.Group>
                                
                            </Col>                                         
                    </Row>
                    <Row className="row justify-content-center">
                        <Button sm={12} lg={4} className=" btnBlue">Show all</Button>
                        <i id="prev" className=" fa fa-chevron-circle-left fa-2x btnRight"  style={{color : '#034BB7' , marginRight : '10px', marginTop : '10px'}}></i>
                        <i id="next" className=" fa fa-chevron-circle-right fa-2x btnLeft" style={{color : '#034BB7', marginLeft : '10px' , marginTop : '10px'}}></i>
                        
            {/* <button className="btnResult btn-primary" onClick={onCancel}>Cancel</button> */}
                    </Row>
                </Card.Body>
          </Card>
    </Modal>
  );
};
export default StepsModal;