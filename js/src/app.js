/**
 * Created by kawnayeen on 1/29/17.
 */
import DataManager from "./businessobject/data.manager";
import ViewManager from "./view.manager";
import SurahListGenerator from "./services/surah.list.generator";
import Util from "./util";
import AyatFetcher from "./services/ayat.fetcher";
import AyatReciter from "./services/ayat.reciter";

(function () {
    "use strict";
    let surahListGenerator = null;
    let dataManager = null;
    let viewManager = null;
    let util = null;
    let surah = null;
    let ayatFetcher = null;
    let ayatReciter = null;

    function initialize() {
        dataManager = new DataManager();
        surahListGenerator = new SurahListGenerator(dataManager);
        viewManager = new ViewManager();
        util = new Util();
        ayatFetcher = new AyatFetcher();
        ayatReciter = new AyatReciter(viewManager);
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
        let ayatFetchingTask = ayatFetcher.getAyats(surahNumber, startingAyat, endingAyat);

        ayatFetchingTask.then(x => ayatReciter.reciteAyats(x));
    }

    document.addEventListener('DOMContentLoaded', function () {
        initialize();
        addEventListeners();
    });
}());