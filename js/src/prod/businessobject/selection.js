/**
 * Created by kawnayeen on 2/12/17.
 */
"use strict";
export default class Selection {
    constructor(surahInfo, startAyat, endAyat) {
        this.surahInfo = surahInfo;
        this.startAyat = startAyat;
        this.endAyat = endAyat;
    }

    getSurahInfo() {
        return this.surahInfo;
    }

    getStartingAyat() {
        return this.startAyat;
    }

    getEndingAyat() {
        return this.endAyat;
    }
}