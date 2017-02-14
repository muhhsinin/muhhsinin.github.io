/**
 * Created by kawnayeen on 1/31/17.
 */
"use strict";

export default class SurahInfo {
    constructor(info) {
        this.number = info.number;
        this.name = info.name;
        this.englishName = info.englishName;
        this.numberOfAyat = info.numberOfAyahs;
        this.displayName = '';
        this.generateDisplayName();
    }

    generateDisplayName() {
        this.displayName = `${this.number}. ${this.englishName} (${this.name})`;
    }

    getDisplayName() {
        return this.displayName;
    }
}