import React from "react";
import { LoaderProps } from "./models";

export default class LoaderComponent extends React.Component<LoaderProps>{
    public render(){
        if (this.props.showLoader){
            return (
                <div className="loader">
                    <h1>Running...</h1>
                </div>
            );
        }
        else{
            return null;
        }
    }
}