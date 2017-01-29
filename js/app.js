/**
 * Created by kawnayeen on 1/29/17.
 */
(function () {
    "use strict";
    var surahSelectionNode = 'surahSelectionButton';
    var selectedSurahNode = 'selectedSurah';
    var surahInput = null;
    var surahSelectionButton = null;

    function initActionListener() {
        surahSelectionButton = document.getElementById(surahSelectionNode);
        surahSelectionButton.classList.add('disabled');
        surahInput = document.getElementById(selectedSurahNode);
        surahSelectionButton.addEventListener('click', surahSelected);
        surahInput.addEventListener('input', checkForActivatingButton)
    }

    function surahSelected() {
        console.log(surahInput.value);
        console.log("Surah Selected");
    }

    function checkForActivatingButton() {
        var valueAtInputField = surahInput.value;
        console.log(valueAtInputField);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initActionListener();
    });
}());