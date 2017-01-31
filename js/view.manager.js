/**
 * Created by kawnayeen on 1/31/17.
 */
function ViewManager() {
    this.surahInputId = 'selectedSurah';
    this.startingAyatId = 'startingAyat';
    this.endingAyatId = 'endingAyat';
    this.ayatAreaId = 'ayatArea';
    this.surahInputNode = null;
    this.startingAyatNode = null;
    this.endingAyatNode = null;
    this.ayatAreaNode = null;
}

ViewManager.prototype.initialize = function () {
    this.surahInputNode = document.getElementById(this.surahInputId);
    this.startingAyatNode = document.getElementById(this.startingAyatId);
    this.endingAyatNode = document.getElementById(this.endingAyatId);
    this.ayatAreaNode = document.getElementById(this.ayatAreaId);
}

ViewManager.prototype.getStartingAyatNode = function () {
    return this.startingAyatNode;
}

ViewManager.prototype.getEndingAyatNode = function () {
    return this.endingAyatNode;
}

ViewManager.prototype.getStartingAyat = function () {
    return parseInt(this.startingAyatNode.value);
}

ViewManager.prototype.getEndingAyat = function () {
    return parseInt(this.endingAyatNode.value);
}

ViewManager.prototype.getSelectedSurahNode = function () {
    return this.surahInputNode;
}

ViewManager.prototype.getSelectedSurah = function () {
    return this.surahInputNode.value;
}

ViewManager.prototype.setContentAtStartingAyat = function (content) {
    this.startingAyatNode.innerHTML = content;
}

ViewManager.prototype.setContentAtEndingAyat = function (content) {
    this.endingAyatNode.innerHTML = content;
}

ViewManager.prototype.setContentAtAyatArea = function (content) {
    this.ayatAreaNode.innerHTML = content;
}