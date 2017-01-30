/**
 * Created by kawnayeen on 1/22/17.
 */
(function () {
    "use strict";
    const surahListUrl = 'resources/surah.list.json';
    const surahListNodeId = 'surahList';

    function grabSurahList() {
        $.ajax({
            method: 'GET',
            url: surahListUrl
        }).done(function (output) {
            DataManager.surahList = generateSurahInfos(output);
            generateSurahListHtml();
        }).fail(function (output) {
            console.log('Fail to retrieve surah list');
        });
    }

    function generateSurahInfos(jsonData) {
        var temp = [];
        jsonData.forEach(function (element) {
            temp.push(new SurahInfo(element));
        });
        return temp;
    }

    function generateSurahListHtml() {
        var htmlContent = '';
        DataManager.surahList.forEach(function (element) {
            htmlContent += generateOptionTagFromSurah(element);
        });

        var surahListNode = document.getElementById(surahListNodeId);
        surahListNode.innerHTML = htmlContent;
    }

    function generateOptionTagFromSurah(surah) {
        var output = '<option value="' + surah.getDisplayName() + '">';
        return output;
    }

    document.addEventListener('DOMContentLoaded', function () {
        grabSurahList();
    });
}());