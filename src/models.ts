export interface InputModel{
    text: string;
    k1: string;
    k2: string;
}

export interface OutputModel{
    text: string;
    sentimentScores: SentimentScore[];
}

export interface SentimentScore{
    sentence: string;
    score: number;
}