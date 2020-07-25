import React from 'react';
import { InputModel } from './models';
export default class InputComponent extends React.Component<{}, InputModel>{

    constructor(props) {
        super(props);
        this.state = {
            k1: "",
            k2: "",
            text: "",
        };
    }

    render(){
        return(
            <div>
                <form onSubmit={this.getSentiments.bind(this)}>
                    <textarea rows={10} onChange={this.handleTextChange.bind(this)}></textarea>
                    <br />
                    <div className="keywordInputArea">
                        <div>
                            <span className="keywordLbl">Keyword 1:</span>
                            <input id="keyword1" onChange={this.handleKeywordChange.bind(this)} placeholder="Enter keyword here" />
                        </div>
                        <div>
                            <span className="keywordLbl">Keyword 2:</span>
                            <input id="keyword2" onChange={this.handleKeywordChange.bind(this)} placeholder="Enter keyword here" />
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        )
    }

    handleKeywordChange(e){
        if(e.target.id === "keyword1")
            this.setState({...this.state, k1: e.target.value});
        else
            this.setState({...this.state, k2: e.target.value});
    }

    handleTextChange(e){
        this.setState({...this.state, text: e.target.value});
    }

    getSentiments(){

    }
}