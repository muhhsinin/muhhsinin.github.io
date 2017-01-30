/**
 * Created by kawnayeen on 1/29/17.
 */
(function () {
    "use strict";
    var surahSelectionId = 'surahSelectionButton';
    var selectedSurahId = 'selectedSurah';
    var startingAyatId = 'startingAyat';
    var endingAyatId = 'endingAyat';
    var ayatAreaId = 'ayatArea';
    var startingAyatNode = null;
    var endingAyatNode = null;
    var ayatAreaNode = null;
    var surahInput = null;
    var surahSelectionButton = null;
    var surah = null;
    var startingAyat = 0;
    var endingAyat = 0;
    var ayats = [];

    function initActionListener() {
        surahSelectionButton = document.getElementById(surahSelectionId);
        surahInput = document.getElementById(selectedSurahId);
        startingAyatNode = document.getElementById(startingAyatId);
        endingAyatNode = document.getElementById(endingAyatId);
        ayatAreaNode = document.getElementById(ayatAreaId);
        surahSelectionButton.disabled = true;
        surahInput.addEventListener('input', checkForActivatingButton);
        surahSelectionButton.addEventListener('click', surahSelected);
        startingAyatNode.addEventListener('input', populateEndingAyatDropDown);
        endingAyatNode.addEventListener('input', finalProcessing);
    }

    function checkForActivatingButton() {
        var valueAtInputField = surahInput.value;
        surahSelectionButton.disabled = true;
        if (DataManager.isSurahExistByDisplayName(valueAtInputField)) {
            surahSelectionButton.disabled = false;
            surahSelected();
        }
    }

    function surahSelected() {
        surah = DataManager.findSurahByDisplayName(surahInput.value);
        populateStartingAyatDropDown();
    }

    function populateStartingAyatDropDown() {
        var optionNode = '';
        for (var i = 1; i <= surah.numberOfAyat; i++)
            optionNode += '<option>' + i + '</option>';
        startingAyatNode.innerHTML = optionNode;
    }

    function populateEndingAyatDropDown() {
        startingAyat = parseInt(startingAyatNode.value);
        var optionNodeHtml = '';
        for (var i = startingAyat + 1; i <= surah.numberOfAyat; i++)
            optionNodeHtml += '<option>' + i + '</option>';
        endingAyatNode.innerHTML = optionNodeHtml;
    }

    function finalProcessing() {
        endingAyat = parseInt(endingAyatNode.value);
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
        ayatAreaNode.innerHTML = ayatHtmlContent;
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
        initActionListener();
    });
}());