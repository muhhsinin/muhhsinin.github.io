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

    generate(){
        $.ajax({
            method: 'GET',
            url: 'resources/surah.list.json'
        }).done(data => {
            this.dataManager.setSurahList(this.generateSurahInfos(data));
            this.generateSurahListHtml();
        }).fail(err => console.log('Fail to retrieve surah list'));
    }

    generateSurahInfos(jsonData) {
        let temp = [];
        jsonData.forEach(element => temp.push(new SurahInfo(element)));
        return temp;
    }

    generateSurahListHtml() {
        let htmlContent = '';
        this.dataManager.getSurahList().forEach(surah => htmlContent += this.generateOptionTagFromSurah(surah));
        let surahListNode = document.getElementById(this.surahListNodeId);
        surahListNode.innerHTML = htmlContent;
    }

    generateOptionTagFromSurah(surah) {
        let output = `<option value="${surah.getDisplayName()}">`;
        return output;
    }
}