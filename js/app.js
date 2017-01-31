/**
 * Created by kawnayeen on 1/29/17.
 */
(function () {
    "use strict";
    var viewManager = null;
    var surah = null;
    var startingAyat = 0;
    var endingAyat = 0;
    var ayats = [];

    function initialize() {
        viewManager = new ViewManager();
        viewManager.initialize();
        viewManager.getSelectedSurahNode().addEventListener('input', checkForActivatingButton);
        viewManager.getStartingAyatNode().addEventListener('input', populateEndingAyatDropDown);
        viewManager.getEndingAyatNode().addEventListener('input', finalProcessing);
    }

    function checkForActivatingButton() {
        if (DataManager.isSurahExistByDisplayName(viewManager.getSelectedSurah())) {
            surahSelected();
        }
    }

    function surahSelected() {
        surah = DataManager.findSurahByDisplayName(viewManager.getSelectedSurah());
        populateStartingAyatDropDown();
    }

    function populateStartingAyatDropDown() {
        viewManager.setContentAtStartingAyat(generateOptions(1, surah.numberOfAyat));
    }

    function populateEndingAyatDropDown() {
        var htmlContent = generateOptions(viewManager.getStartingAyat(), surah.numberOfAyat);
        viewManager.setContentAtEndingAyat(htmlContent);
    }

    function generateOptions(start, end) {
        var optionHtml = '';
        for (var i = start; i <= end; i++)
            optionHtml += '<option>' + i + '</option>';
        return optionHtml;
    }

    function finalProcessing() {
        endingAyat = viewManager.getEndingAyat();
        var surahId = convertTo3Digit(surah.number);
        var endPoints = [];
        for (var i = startingAyat; i <= endingAyat; i++) {
            endPoints.push('resources/ayat/' + surahId + '/' + surahId + convertTo3Digit(i) + '.json');
        }
        getAyats(endPoints);
    }

    function getAyats(endPoints) {
        endPoints.forEach(function (ayatUri) {
            $.ajax({
                method: 'GET',
                url: ayatUri
            }).done(function (output) {
                ayats.push(output);
                pushAyat();
            }).fail(function (output) {
                console.log('Fail to retrieve surah list');
            });
        });
    }

    function pushAyat() {
        var ayatHtmlContent = '';
        ayats.forEach(function (ayat) {
            ayatHtmlContent += '<p>' + ayat['arabic'] + '</p>';
        });
        viewManager.setContentAtAyatArea(ayatHtmlContent);
    }

    function convertTo3Digit(number) {
        if (number < 10) {
            return '00' + number;
        } else if (number < 100)
            return '0' + number;
        else
            return '' + number;
    }

    document.addEventListener('DOMContentLoaded', function () {
        initialize();
    });
}());
