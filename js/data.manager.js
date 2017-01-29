/**
 * Created by kawnayeen on 1/29/17.
 */
"use strict";
var surahList = [];

function SurahInfo(info) {
    this.number = info['number'];
    this.name = info['name'];
    this.englishName = info['englishName'];
    this.numberOfAyat = info['numberOfAyahs'];
    this.displayName = '';
    this.generateDisplayName();
}

SurahInfo.prototype.generateDisplayName = function () {
    this.displayName = this.number + '. ' +
        this.englishName + ' (' + this.name + ')';
}

SurahInfo.prototype.getDisplayName = function () {
    return this.displayName;
}
