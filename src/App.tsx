import React from 'react';
import './App.css';
import InputComponent from './InputComponent';
import { InputModel, TopicSentimentData, AppState } from './models';
import OutputComponent from './OutputComponent';

class App extends React.Component<{}, AppState>{

  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      data: null
    }
  }

  public render() {
    return (
      <div className="App">
        <h1>
          Capstone assignment 7
        </h1>
        <br />
        <p className="description">
          Given a body of text and a couple of keywords, this tool generates a sentiment rating for each of the ideas expressed by the keywords in the text. A score between -1 and +1 is generated for each of the
          topics. -1 indicates that an idea expressed by the keyword was present in an extremely negative connotation in the text whereas +1 indicates completely positive. 0 indicates a neutral sentiment.
          The tool also highlights the sentences where the topic is expressed in a colour appropriate with the sentiment: red for negative, yellow for neutral and green for positive.
        </p>
        <InputComponent onSubmit={this.getSentimentScores.bind(this)} />
        <hr />
        <div>
          {this.state.data && Object.keys(this.state.data).map(this.createOutputElement.bind(this))}
        </div>
      </div>
    );
  }

  private createOutputElement(word: string): JSX.Element{
    if(word === ""){
      return null;
    }
    
    const data: TopicSentimentData = this.state.data[word];
    return (
      <div>
        <h4>{word}</h4>
        <p>
          Overall score: {data.score}
        </p>
        <p>
          <OutputComponent text={this.state.inputText} sentimentScores={data.sent_class} />
        </p>
      </div>
    );
  }

  public getSentimentScores(text: string, keyword1: string, keyword2: string) {
    const api_url = "https://69r6k8n7pc.execute-api.us-east-2.amazonaws.com/prod/topicsentiment";
    this.setState({inputText: text});
    const data: InputModel = {
      text: text,
      k1: keyword1, 
      k2: keyword2
    };

    fetch(api_url, {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response: Response) => {
      return response.text();
    }).then((responseText: string) => {
      this.setState({data: JSON.parse(responseText)});
    });
  }
}

export default App;
