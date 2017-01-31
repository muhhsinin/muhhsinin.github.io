/**
 * Created by kawnayeen on 1/22/17.
 */
import SurahInfo from "./surah.info";

"use strict";
export default class SurahListGenerator {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.surahListNodeId = 'surahList';
    }

    generateSurahInfos(jsonData) {
        var temp = [];
        jsonData.forEach(element => temp.push(new SurahInfo(element)));
        return temp;
    }

    generateSurahListHtml() {
        var htmlContent = '';
        this.dataManager.getSurahList().forEach(surah => htmlContent += this.generateOptionTagFromSurah(surah));
        var surahListNode = document.getElementById(this.surahListNodeId);
        surahListNode.innerHTML = htmlContent;
    }

    generateOptionTagFromSurah(surah) {
        let output = '<option value="' + surah.getDisplayName() + '">';
        return output;
    }
}