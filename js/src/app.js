/**
 * Created by kawnayeen on 1/29/17.
 */
import DataManager from "./data.manager";
import ViewManager from "./view.manager";
import SurahListGenerator from "./surah.list.generator";
import Util from "./util";

(function () {
    "use strict";
    let surahListGenerator = null;
    let dataManager = null;
    let viewManager = null;
    let util = null;
    let surah = null;
    let startingAyat = 0;
    let endingAyat = 0;
    let ayats = [];

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
        ayats = [];
        startingAyat = viewManager.getStartingAyat();
        endingAyat = viewManager.getEndingAyat();
        let surahId = util.to3digitString(surah.number);
        let endPoints = [];
        for (let i = startingAyat; i <= endingAyat; i++) {
            endPoints.push('resources/ayat/' + surahId + '/' + surahId + util.to3digitString(i) + '.json');
        }
        getAyats(endPoints);
    }

    function getAyats(endPoints) {
        endPoints.forEach(ayatUri => {
            fetch(ayatUri)
                .then(r => r.json())
                .then(r => {
                    ayats.push(r);
                    pushAyat();
                });
        });
    }

    function pushAyat() {
        let ayatHtmlContent = ``;
        ayats.forEach(ayat => ayatHtmlContent += `<p>${ayat.arabic}</p>`);
        viewManager.setContentAtAyatArea(ayatHtmlContent);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initialize();
        addEventListeners();
    });
}());