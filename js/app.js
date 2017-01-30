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
        surahSelectionButton.disabled = true;
        surahInput = document.getElementById(selectedSurahNode);
        surahSelectionButton.addEventListener('click', surahSelected);
        surahInput.addEventListener('input', checkForActivatingButton)
    }

    function surahSelected() {
        var surah = DataManager.findSurahByDisplayName(surahInput.value);
        console.log(surah);
        console.log(surah.toString());
    }

    function checkForActivatingButton() {
        var valueAtInputField = surahInput.value;
        surahSelectionButton.disabled = true;
        if (DataManager.isSurahExistByDisplayName(valueAtInputField))
            surahSelectionButton.disabled = false;
    }

    document.addEventListener('DOMContentLoaded', function () {
        initActionListener();
    });
}());