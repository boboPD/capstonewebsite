import React from 'react';
import { OutputModel } from './models';
export default class OutputComponent extends React.Component<{}, OutputModel>{
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            sentimentScores: []
        }
    }

    public render(): JSX.Element{
        return(
            <p>
                
            </p>
        );
    }

    private convertToHighlightedText(): JSX.Element{
        return (
            <div></div>
        );
    }
}