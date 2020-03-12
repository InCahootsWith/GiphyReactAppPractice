import React from "react";
import ImageDisplay from "./ImageDisplay";
import './Results.scss'
import Fade from 'react-reveal/Fade'

//bootstrap
import Col from 'react-bootstrap/Col'


const Results = (props) => {


    // html for error
    const makeError = () => {
        return (
            <Col className="justify-content-center display">
                <Fade top>
                    <h3>We're having some issues at the moment...please try again later</h3>
                    <hr/>
                </Fade>
                <ImageDisplay items={props.trendResult}/>
            </Col>
        )
    }

    // checks if something is currently being searched
    // TODO: can i make this a bool?
    const checkResult = (value) => {
        if (value != 'q=') {
            return true;
        } else return false;
    };

    /*
    > if the search has valid data and is possible then it shows that
    > if the search is not possible i.e. doesn't exist then it display message
     */
    const makeResult = () => {
        if (props.searchResultInfo.count >= 1) {
            return(
                <Col className="justify-content-center display">
                    <Fade>
                        <h4>Top search results for: {props.value.slice(2)}</h4>
                    </Fade>
                    <Fade top>
                        <h5>Total: {props.searchResultInfo.count} </h5>
                    </Fade>
                    <ImageDisplay items={props.searchResult}/>
                </Col>
            )
        }else if (props.searchResultInfo.count === 0){
            return  (
                <Col className="justify-content-center display">
                    <h3>{props.value.slice(2)} is not a thing we have :(</h3>
                </Col>
            );
        }
    }

    // displays the trending gifs -> if nothing is in the search bar this will always run
    const makeTrend = () => {
        return (
            <Col className="justify-content-center display">
                <Fade>
                    <h1>Top trending currently</h1>
                </Fade>
                <ImageDisplay items={props.trendResult}/>
            </Col>
        )
    }

  return (
         <div>
             {checkResult(props.value) && !props.error ?  makeResult() : !props.error? makeTrend() : makeError()}
         </div>
  )
}
export default Results;