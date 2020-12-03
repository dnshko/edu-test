import React,{ useState }  from 'react';
import './Result.css';
import StepsModal from './viewSteps';
import VideoModal from './viewVideo';
import { set,filter, equals, pathOr,head } from 'ramda';



function Result(props) {
    let questions = props.questions;
    questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer); })
    console.log('questions',questions)
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupvideo, setShowPopupvideo] = useState(false);
    const [showQuestionId,setQuestionId] = useState(1);

    const onCancel = () =>{
        setShowPopup(false)
        setShowPopupvideo(false)
     }
     
     const renderVideoPopup = (questionId) => {
        console.log('showPopupvideo')
        return (
          <VideoModal
          showPopupvideo={showPopupvideo}
            onCancel={onCancel}
           
            question={getParticularQuestion(questionId,questions)}
          />
        );
      };
      const getParticularQuestion = (questionId,questions) =>{
        const filterParticularquestionFromWholeObject = (questions) =>{
           return equals(
                pathOr('',['id'],questions),//how to get id from questions array
                questionId
            )
           
        }
         return head(filter(filterParticularquestionFromWholeObject,questions))
      }
     const renderPopup = (questionId) => {
          return (
          <StepsModal
            showPopup={showPopup}
            onCancel={onCancel}  
            question={getParticularQuestion(questionId,questions)}
          />
        );
      };

      const setPopupStep = (booleanValue,questionId) =>
      {
        setQuestionId(questionId)
        setShowPopup(booleanValue);
       
      }
    return (
    
     <div class="card">
        <div className="result">
                    <div class="card-header" style={{backgroundColor : '#21234E', color : 'white' ,borderBottom: '5px solid #F05103', borderRadius: '12px 12px 0px 0px'}}>
                         <h2 className="text-center font-weight-normal">Result</h2>
                    </div>
                    <nav aria-label="breadcrumb" >
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item " >                                   
                                    <p>TEST NAME: Javascript Quiz</p>
                                </li>
                            </ol>
                        </nav>
                    
            {questions.map((q, index) =>
                <div key={q.id} className={`mb-2 alert ${q.isCorrect ? 'alert-success' : 'alert-danger'}`} role="alert" style={{
                    border: '2px solid',
                    padding: '10',
                    margin: '10px',
                    borderRadius: '20px'
                }}>{q.isCorrect ? <i className="fa fa-check-circle" style={{fontSize:"30px", position:"relative", top:"40px" ,right:"15px"}}></i> : <i className="fa fa-times-circle" style={{fontSize:"30px", position:"relative", top:"40px" ,right:"15px"}}></i>}
                    <div class="row">
                        <div class="col-lg-8 sm-8">
                    <div className="result-question" style={{backgroundColor : `${q.isCorrect ? 'alert-success' : 'alert-danger'}`}}>
                        <h5 style={{Color : `${q.isCorrect ? 'alert-success' : 'alert-danger'}`,marginLeft:"20px"}}>  <span  className="numberBg">{index + 1}</span> {q.name}</h5>
                        <div className="row">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <input id={option.id} type="checkbox" disabled="disabled" checked={(option.selected && option.isAnswer)}  className="option-input radio"  /> {option.name}
                                    </div>
                                )
                            }
                        </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4 sm-4">
                                   
                                   <button className="btnResult btn-primary " onClick={()=>setPopupStep(true,q.id)}>view steps</button>                                  
                                   <button className="btnResult btn-primary " onClick={() => setShowPopupvideo(true)}>view video</button>
                       
               </div>
                    </div>
                        <div className={`m-1 p-1 text-bold ${q.isCorrect ? 'text-success' : 'text-danger'}`}>Your answer is {q.isCorrect ? 'Correct' : 'Wrong'}.</div>
                      
                
                </div>
            )}
        </div>
        {showPopup && renderPopup(showQuestionId)}
        {showPopupvideo && renderVideoPopup(showQuestionId)}
   
    </div>
    )
}

export default Result;