/**
 * Created by kawnayeen on 1/29/17.
 */
import DataManager from "./data.manager";
import ViewManager from "./view.manager";
import SurahListGenerator from "./surah.list.generator";

(function () {
    "use strict";
    let surahListGenerator = null;
    let dataManager = null;
    let viewManager = null;
    let surah = null;
    let startingAyat = 0;
    let endingAyat = 0;
    let ayats = [];

    function initialize() {
        viewManager = new ViewManager();
        viewManager.initialize();
        viewManager.getSelectedSurahNode().addEventListener('input', checkForActivatingButton);
        viewManager.getStartingAyatNode().addEventListener('input', populateEndingAyatDropDown);
        viewManager.getEndingAyatNode().addEventListener('input', finalProcessing);
    }

    function checkForActivatingButton() {
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
        let surahId = convertTo3Digit(surah.number);
        let endPoints = [];
        for (let i = startingAyat; i <= endingAyat; i++) {
            endPoints.push('resources/ayat/' + surahId + '/' + surahId + convertTo3Digit(i) + '.json');
        }
        getAyats(endPoints);
    }

    function getAyats(endPoints) {
        endPoints.forEach(function (ayatUri) {
            $.ajax({
                method: 'GET',
                url: ayatUri
            }).done(data => {
                ayats.push(data);
                pushAyat();
            }).fail(err => console.log('Fail to retrieve ayat'));
        });
    }

    function pushAyat() {
        let ayatHtmlContent = ``;
        ayats.forEach(function (ayat) {
            ayatHtmlContent += `<p>${ayat['arabic']}</p>`;
        });
        viewManager.setContentAtAyatArea(ayatHtmlContent);
    }

    function convertTo3Digit(number) {
        if (number < 10)
            return `00${number}`;
        else if (number < 100)
            return `0${number}`;
        else
            return number.toString();
    }

    document.addEventListener('DOMContentLoaded', function () {
        dataManager = new DataManager();
        surahListGenerator = new SurahListGenerator(dataManager);
        surahListGenerator.generate();
        initialize();
    });
}());
