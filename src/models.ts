export interface InputModel{
    text: string;
    k1: string;
    k2: string;
}

export interface OutputModelProps{
    text: string;
    sentimentScores: SentimentClass[];
}

export interface TopicSentimentData{
    score: number;
    sent_class: SentimentClass[];
}

export interface SentimentClass{
    sentence: string;
    class: "POSITIVE" | "NEGATIVE" | "MIXED" | "NEUTRAL";
}

export interface GlobalState {
    inputData: InputModel;
    outputData: OutputModelProps;
}

export interface InputModelProps{
    onSubmit: Function;
}