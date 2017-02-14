/**
 * Created by kawnayeen on 2/12/17.
 */
"use strict";
import Selection from "../prod/businessobject/selection";

export default class AyatSelector {
    constructor(viewManager, dataManager, appController) {
        this.viewManager = viewManager;
        this.dataManager = dataManager;
        this.appController = appController;
        this.surah = null;
        this.initListener();
    }

    initListener() {
        this.viewManager.getSelectedSurahNode().addEventListener('input', () => this.checkValidSurahName());
        this.viewManager.getStartingAyatNode().addEventListener('input', () => this.populateEndingAyatDropDown());
        this.viewManager.getEndingAyatNode().addEventListener('input', () => this.proceedToRecitation());
    }

    checkValidSurahName() {
        if (this.dataManager.isSurahExistByDisplayName(this.viewManager.getSelectedSurah())) {
            this.surahSelected();
        }
    }

    surahSelected() {
        this.surah = this.dataManager.findSurahByDisplayName(this.viewManager.getSelectedSurah());
        this.populateStartingAyatDropDown();
        this.populateEndingAyatDropDown();
    }

    populateStartingAyatDropDown() {
        this.viewManager.setContentAtStartingAyat(this.generateOptions(1, this.surah.numberOfAyat));
    }

    populateEndingAyatDropDown() {
        var htmlContent = this.generateOptions(this.viewManager.getStartingAyat(), this.surah.numberOfAyat);
        this.viewManager.setContentAtEndingAyat(htmlContent);
    }

    generateOptions(start, end) {
        let optionHtml = ``;
        for (let i = start; i <= end; i++)
            optionHtml += `<option>${i}</option>`;
        return optionHtml;
    }

    proceedToRecitation() {
        let selection = new Selection(this.surah, this.viewManager.getStartingAyat(), this.viewManager.getEndingAyat());
        this.appController.startRecitation(selection);
    }
}