/**
 * Created by kawnayeen on 1/29/17.
 */
import DataManager from "./businessobject/data.manager";
import ViewManager from "./view/view.manager";
import SurahListGenerator from "./services/surah.list.generator";
import AyatSelector from "./services/ayat.selector";
import AyatFetcher from "./services/ayat.fetcher";
import AyatReciter from "./services/ayat.reciter";
import AppController from "./controller/app.controller";

(function () {
    "use strict";
    let surahListGenerator = null;
    let dataManager = null;
    let viewManager = null;
    let ayatSelector = null;
    let ayatFetcher = null;
    let ayatReciter = null;
    let appController = null;

    function initialize() {
        dataManager = new DataManager();
        surahListGenerator = new SurahListGenerator(dataManager);
        viewManager = new ViewManager();
        ayatFetcher = new AyatFetcher();
        ayatReciter = new AyatReciter(viewManager);
        appController = new AppController(ayatFetcher,ayatReciter);
        ayatSelector = new AyatSelector(viewManager,dataManager, appController);
        surahListGenerator.generate();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initialize();
    });
}());