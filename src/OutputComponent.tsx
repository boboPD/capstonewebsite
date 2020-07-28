import React from "react";
import { OutputModelProps, SentimentClass } from "./models";

export default class OutputComponent extends React.Component<OutputModelProps> {
  public render(): JSX.Element {
      if(this.props.sentimentScores.length > 0){
        const textAsHtml: string = this.convertToHighlightedText(this.props.text, this.props.sentimentScores);
        return <div dangerouslySetInnerHTML={{ __html: textAsHtml }} />
      }
      else{
          return <div>This topic was not found in the text.</div>
      }
  }

  private convertToHighlightedText(text: string, sentiments: SentimentClass[]): string {
    let text_markup: string = text.toLowerCase();
    for(let obj of sentiments){
        const idx = text_markup.indexOf(obj.text);
        if(idx !== -1){
            const prefix = text_markup.substring(0, idx);
            const middle = text_markup.substring(idx, idx + obj.text.length);
            const suffix = text_markup.substring(idx + obj.text.length);
            text_markup = `${prefix}<span class='${obj.sentiment.toLowerCase()}'>${middle}</span>${suffix}`;
        }
    }

    return text_markup;
  }
}
