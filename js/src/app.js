/**
 * Created by kawnayeen on 1/29/17.
 */
import DataManager from "./data.manager";
import ViewManager from "./view.manager";
import SurahListGenerator from "./surah.list.generator";
import Util from "./util";
import AyatService from "./ayat.service";

(function () {
    "use strict";
    let surahListGenerator = null;
    let dataManager = null;
    let viewManager = null;
    let util = null;
    let surah = null;

    function initialize() {
        dataManager = new DataManager();
        surahListGenerator = new SurahListGenerator(dataManager);
        viewManager = new ViewManager();
        util = new Util();
        surahListGenerator.generate();
        viewManager.initialize();
    }

    function addEventListeners() {
        viewManager.getSelectedSurahNode().addEventListener('input', checkValidSurahName);
        viewManager.getStartingAyatNode().addEventListener('input', populateEndingAyatDropDown);
        viewManager.getEndingAyatNode().addEventListener('input', finalProcessing);
    }

    function checkValidSurahName() {
        if (dataManager.isSurahExistByDisplayName(viewManager.getSelectedSurah())) {
            surahSelected();
        }
    }

    function surahSelected() {
        surah = dataManager.findSurahByDisplayName(viewManager.getSelectedSurah());
        populateStartingAyatDropDown();
        populateEndingAyatDropDown();
    }

    function populateStartingAyatDropDown() {
        viewManager.setContentAtStartingAyat(generateOptions(1, surah.numberOfAyat));
    }

    function populateEndingAyatDropDown() {
        var htmlContent = generateOptions(viewManager.getStartingAyat(), surah.numberOfAyat);
        viewManager.setContentAtEndingAyat(htmlContent);
    }

    function generateOptions(start, end) {
        let optionHtml = ``;
        for (let i = start; i <= end; i++)
            optionHtml += `<option>${i}</option>`;
        return optionHtml;
    }

    function finalProcessing() {
        let surahNumber = surah.number;
        let startingAyat = viewManager.getStartingAyat();
        let endingAyat = viewManager.getEndingAyat();
        let ayatService = new AyatService();
        let ayatFetchingTask = ayatService.getAyats(surahNumber, startingAyat, endingAyat);

        ayatFetchingTask.then(x => {
            let ayatHtmlContent = ``;
            x.forEach(ayat => ayatHtmlContent += `<p>${ayat.id} # ${ayat.arabic}</p>`);
            viewManager.setContentAtAyatArea(ayatHtmlContent);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initialize();
        addEventListeners();
    });
}());