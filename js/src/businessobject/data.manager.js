/**
 * Created by kawnayeen on 1/29/17.
 */
"use strict";

export default class DataManager {
    constructor() {
        this.surahList = [];
    }

    getSurahList() {
        return this.surahList;
    }

    setSurahList(surahList) {
        this.surahList = surahList;
    }

    isSurahExistByDisplayName(displayName) {
        let surahFound = false;
        for (let index = 0; index < this.surahList.length; index++) {
            if (this.surahList[index].getDisplayName() === displayName) {
                surahFound = true;
                break;
            }
        }
        return surahFound;
    }

    findSurahByDisplayName(displayName) {
        if (this.isSurahExistByDisplayName(displayName)) {
            for (var index = 0; index < this.surahList.length; index++) {
                if (this.surahList[index].getDisplayName() === displayName) {
                    return this.surahList[index];
                }
            }
        } else
            return null;
    }
}