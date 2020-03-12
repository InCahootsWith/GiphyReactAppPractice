import React, { useState, useEffect } from 'react';
import './App.scss'


//components
import Header from "./Header/Header";
import Results from "./Results/Results";
import {API_KEY} from "./Keys";
import Loader from 'react-loader-spinner'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Fade from "react-reveal/Fade";

//variables
const trendURL = 'http://api.giphy.com/v1/gifs/trending?' + "&api_key=" + process.env.API_KEY + "&limit=50" + "&offset=" ;
const offset = 50;

const App  = () => {

    //setting up my hooked states
    const [loaded, setLoaded] = useState(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [searchBar, setSearchBar] = useState('q=');

    const [trending, setTrending] = useState([]);
    const [terror, tsetError] = useState(null);

    var offsetTrend = 0;
    const [trendComplete, setTrendComplete] = useState(false);


    /*
    * MAIN FETCH FUNCTIONS
    * purpose: fetches the data and separates them to the correct variables
    */


    // the initial trend fetch
    useEffect(() => {
        fetch(trendURL)
            .then(response => processResponse(response))
            .then(result => {
                    setTrending(result.data);
                    offsetTrend = offset;
                    setLoaded(false);
                },
                (error) => {
                    tsetError(error);
                    setLoaded(false);
                });
    }, []);

    //if the user reaches the end of the page add to the current object holding that data
    // TODO : can i combine the initial trend fetch and this one ?
    const doFetchTrend = () => {

        let fullURL = trendURL + offsetTrend;
        fetch(fullURL)
            .then(response => processResponse(response))
            .then((result) => {
                    setTrending(trending => trending.concat(result.data));
                    offsetTrend = result.pagination.offset + offset;
                },
                (error) => {
                    tsetError(error);
                    setLoaded(false);
                })

    }

    //if a search is started
    // TODO: add the infinite scroll for the search items
    const search = searchValue => {
        let urlGif = 'http://api.giphy.com/v1/gifs/search?q=';
        doFetch(searchValue, urlGif);
    }

    const doFetch = (searchValue, url) => {
        let fullURL = url + searchValue + "&api_key=" + API_KEY;

        fetch(fullURL)
        .then(response => processResponse(response))
        .then((result) => {
                setLoaded(false);
                setItems(result);
                setSearchBar('q=' + searchValue);
            },
            (error) => {
                setLoaded(false);
                setError(error);
            })
    }

    // ensures the json object is good to go
    const processResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }

    /*
   * CHECK FOR END OF WINDOW  FUNCTIONS
   * purpose: checks if the user has reached the end of the page and loads more data
   */

    //add's listener to end of page
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    //checks we're okay to do the add fetch
    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

        if(!items.length) {
            if(offsetTrend >= 150) {
                setTrendComplete(true);
            }else {
                doFetchTrend();
            }
        }
    }

    return (
        <div>
            <Header search={search}/>
            {loaded && !error ?
                (
                    <Loader className="loader"
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}

                    />
                ) : terror ? ( // if there's an error the whole thing should stop
                    <Col className="justify-content-center" display>
                        <Fade>
                            <h3>Something is wrong! Please come back later...</h3>
                        </Fade>
                    </Col>
                ) : (

                    <div>
                        <Row>
                            <Results searchResult={items.data} value = {searchBar} searchResultInfo={items.pagination}
                                 trendResult={trending} error={error}/>
                        </Row>
                        <Row>
                            <Col className="justify-content-center display">
                                {searchBar === 'q='
                                    ? trendComplete
                                        ? <div>
                                            <h4>You've reached the end of Trending!</h4><p>Beta Version V1</p>
                                          </div>
                                        : <Loader
                                            type="MutatingDots"
                                            color="#00BFFF"
                                            height={100}
                                            width={100}/>

                                    :<p>Beta Version V1</p>
                                }
                            </Col>

                        </Row>

                    </div>
                )
            }
        </div>
    )
}
export default App;