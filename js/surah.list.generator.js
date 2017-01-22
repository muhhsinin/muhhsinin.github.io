/**
 * Created by kawnayeen on 1/22/17.
 */
(function () {
    "use strict";
    const surahListUrl = 'resources/surah.list.json';
    const surahListNodeId = 'surahList';
    var surahList = [];

    function grabSurahList() {
        $.ajax({
            method: 'GET',
            url: surahListUrl
        }).done(function (output) {
            surahList = output;
            console.log(surahList);
            generateSurahListHtml();
        }).fail(function (output) {
            console.log('Fail to retrieve surah list');
        });
    }

    function generateSurahListHtml() {
        var htmlContent = '';
        surahList.forEach(function (element) {
            htmlContent += generateOptionTagFromSurah(element);
        });

        var surahListNode = document.getElementById(surahListNodeId);
        surahListNode.innerHTML = htmlContent;
    }

    function generateOptionTagFromSurah(surah) {
        var output = '<option value="' + surah["number"] + '. ' +
            surah["englishName"] + ' (' + surah["name"] + ')">';
        return output;
    }

    document.addEventListener('DOMContentLoaded', function () {
        grabSurahList();
    });
}());