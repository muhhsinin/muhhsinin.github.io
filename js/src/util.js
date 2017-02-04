/**
 * Created by kawnayeen on 2/4/17.
 */
"use strict";

export default class Util{
    constructor(){

    }

    to3digitString(number){
        if (number < 10)
            return `00${number}`;
        else if (number < 100)
            return `0${number}`;
        else
            return number.toString();
    }
}