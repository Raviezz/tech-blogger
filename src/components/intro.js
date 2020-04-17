import React from 'react';
import {Centered, OutlinedButtonLink} from './common-components/intro-util';

export default class Intro extends React.Component{
    constructor(props){
        super();
    }

    render(){
        return(
        <Centered>
                <div style={{fontSize: 22, marginBottom: 100}}>
                <p>This blogger is maintained by two geeks who did their phd in machine learning.
                    Articles from this site gives u immerse knowledge and more practical.
                    Please share it to your friends if you feel good.
                    <br/><br/>
                </p>
                    <OutlinedButtonLink  text={"Know More"}/>
                </div>
            </Centered>
        );
    }

}