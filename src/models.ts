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
    text: string;
    sentiment: "POSITIVE" | "NEGATIVE" | "MIXED" | "NEUTRAL";
}

export interface AppState {
    inputText: string;
    data: TopicSentimentData;
    showLoader: boolean;
}

export interface InputModelProps{
    onSubmit: Function;
}

export interface LoaderProps{
    showLoader: boolean;
}