import React from 'react';
import './App.css';
import InputComponent from './InputComponent';
import { InputModel, TopicSentimentData } from './models';

class App extends React.Component{

  private api_response: {[word: string]: TopicSentimentData};

  public render() {
    return (
      <div className="App">
        <h1>
          Capstone assignment 7
        </h1>
        <br />
        <p className="description">
          Given a body of text and 2 couple of keywords, this tool generates a rating based on each of the ideas expressed by the keywords.
        </p>
        <InputComponent onSubmit={this.getSentimentScores.bind(this)}/>
      </div>
    );
  }

  public getSentimentScores(text: string, keyword1: string, keyword2: string) {
    const api_url = "https://rpums2hr06.execute-api.us-east-2.amazonaws.com/default/capstone7";
    const data: InputModel = {
      text: text,
      k1: keyword1, 
      k2: keyword2
    };

    fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    }).then(async (response: Response) => {
      this.api_response = await response.json();
    })
  }
}

export default App;
