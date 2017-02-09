/**
 * Created by kawnayeen on 2/9/17.
 */
"use strict";

import Util from "./util";

export default class AyatService {
    constructor() {
        this.util = new Util();
    }

    getAyat(surahNumber, ayatNumber) {
        let surahId = this.util.to3digitString(surahNumber);
        let ayatId = this.util.to3digitString(ayatNumber);
        let ayatUri = `resources/ayat/${surahId}/${surahId}${ayatId}.json`;
        let ayatFetchingTask = new Promise((resolve, reject) => {
                fetch(ayatUri)
                    .then(r => r.json())
                    .then(r => resolve(r))
                    .catch(reject('Ayat Not Found '+ayatUri));
            }
        );
        return ayatFetchingTask;
    }

    getAyats(surahNumber, startingAyat, endingAyat) {
        let allFetchingTasks = [];
        let ayats = [];
        for (let i = startingAyat; i <= endingAyat; i++) {
            allFetchingTasks.push(this.getAyat(surahNumber, i));
        }
        allFetchingTasks.forEach(task => task.then(ayat => ayats.push(ayat)));

        let awesomePromise = new Promise((resolve, reject) => {

            window.setTimeout(()=>resolve(ayats),3000);
            // do {
            //
            // } while (allFetchingTasks.length !== ayats.length);
            // resolve(ayats);
            //allFetchingTasks[0].then(ayat=>{ayats.push(ayat)})
        });

        return awesomePromise;
    }
}