import React from 'react';
import { InputModel, InputModelProps } from './models';
export default class InputComponent extends React.Component<InputModelProps, InputModel>{

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
                <textarea rows={10} onChange={this.handleTextChange.bind(this)} value={this.state.text}></textarea>
                <br />
                <div className="keywordInputArea">
                    <div>
                        <span className="keywordLbl">Keyword 1:</span>
                        <input id="keyword1" onChange={this.handleKeywordChange.bind(this)} placeholder="Enter keyword here" value={this.state.k1}/>
                    </div>
                    <div>
                        <span className="keywordLbl">Keyword 2:</span>
                        <input id="keyword2" onChange={this.handleKeywordChange.bind(this)} placeholder="Enter keyword here" value={this.state.k2}/>
                    </div>
                </div>
                <button onClick={this.handleSubmit.bind(this)} disabled={this.state.k1 === "" && this.state.k2 === ""}>Submit</button>
            </div>
        )
    }

    private handleKeywordChange(e){
        if(e.target.id === "keyword1")
            this.setState({...this.state, k1: e.target.value});
        else
            this.setState({...this.state, k2: e.target.value});
    }

    private handleTextChange(e){
        this.setState({...this.state, text: e.target.value});
    }
    
    private handleSubmit(e){
        this.props.onSubmit(this.state.text, this.state.k1, this.state.k2);
    }
}