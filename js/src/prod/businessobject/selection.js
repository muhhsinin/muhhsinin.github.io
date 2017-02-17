/**
 * Created by kawnayeen on 2/12/17.
 */
"use strict";
export default class Selection {
    constructor(surahNumber, startAyat, endAyat) {
        this.surahNumber = surahNumber;
        this.startAyat = startAyat;
        this.endAyat = endAyat;
    }

    getSurahNumber() {
        return this.surahNumber;
    }

    getStartingAyat() {
        return this.startAyat;
    }

    getEndingAyat() {
        return this.endAyat;
    }
}