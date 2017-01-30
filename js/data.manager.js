/**
 * Created by kawnayeen on 1/29/17.
 */
"use strict";

function DataManager() {
}
DataManager.surahList = [];

DataManager.isSurahExistByDisplayName = function (displayName) {
    var surahFound = false;
    for (var index = 0; index < DataManager.surahList.length; index++) {
        if (DataManager.surahList[index].getDisplayName() === displayName) {
            surahFound = true;
            break;
        }
    }
    return surahFound;
}

DataManager.findSurahByDisplayName = function (displayName) {
    if (DataManager.isSurahExistByDisplayName(displayName)) {
        for (var index = 0; index < DataManager.surahList.length; index++) {
            if (DataManager.surahList[index].getDisplayName() === displayName) {
                return DataManager.surahList[index];
            }
        }
    } else
        return null;
}

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

SurahInfo.prototype.toString = function () {
    return 'Surah ' + this.englishName + ", Total Ayat : " + this.numberOfAyat;
}
