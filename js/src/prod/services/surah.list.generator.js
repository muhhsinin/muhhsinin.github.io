/**
 * Created by kawnayeen on 1/22/17.
 */
import SurahInfo from "../prod/businessobject/surah.info";

"use strict";
export default class SurahListGenerator {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.surahListNodeId = 'surahList';
        this.surahListUri = 'resources/surah.list.json';
    }

    generate(){
        fetch(this.surahListUri)
            .then(r=>r.json())
            .then(json=>{
                this.dataManager.setSurahList(this.generateSurahInfos(json));
                this.generateSurahListHtml();
            });
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