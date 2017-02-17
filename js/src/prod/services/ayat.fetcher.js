/**
 * Created by kawnayeen on 2/9/17.
 */
"use strict";

import AyatInfo from "../businessobject/ayat.info";

export default class AyatFetcher {
    constructor() {
    }

    getAyat(surahNumber, ayatNumber) {
        let ayatInfo = new AyatInfo(surahNumber, ayatNumber);
        let ayatFetchingTask = new Promise((resolve, reject) => {
                fetch(ayatInfo.getResourceUrl())
                    .then(r => r.json())
                    .then(r => {
                        ayatInfo.setArabicText(r.arabic);
                        ayatInfo.setEnglishTranslation(r.english);
                        ayatInfo.setAyatSerial(r.id);
                    })
                    .then(resolve(ayatInfo));
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
            window.setTimeout(() => {
                ayats.sort((a, b) => a.getAyatSerial() - b.getAyatSerial());
                resolve(ayats);
            }, 1500);
        });
        return awesomePromise;
    }
}