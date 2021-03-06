/**
 * Created by kawnayeen on 1/31/17.
 */
"use strict";

export default class ViewManager {
    constructor() {
        this.surahInputId = 'selectedSurah';
        this.startingAyatId = 'startingAyat';
        this.endingAyatId = 'endingAyat';
        this.ayatAreaId = 'ayatArea';
        this.selectionAreaId = 'selectionArea';
        this.surahInputNode = null;
        this.startingAyatNode = null;
        this.endingAyatNode = null;
        this.ayatAreaNode = null;
        this.selectionAreaNode = null;
        this.initialize();
    }

    initialize() {
        this.surahInputNode = document.getElementById(this.surahInputId);
        this.startingAyatNode = document.getElementById(this.startingAyatId);
        this.endingAyatNode = document.getElementById(this.endingAyatId);
        this.ayatAreaNode = document.getElementById(this.ayatAreaId);
        this.selectionAreaNode = document.getElementById(this.selectionAreaId);
    }

    getStartingAyatNode() {
        return this.startingAyatNode;
    }

    getEndingAyatNode() {
        return this.endingAyatNode;
    }

    getStartingAyat() {
        return parseInt(this.startingAyatNode.value);
    }

    getEndingAyat() {
        return parseInt(this.endingAyatNode.value);
    }

    getSelectedSurahNode() {
        return this.surahInputNode;
    }

    getSelectedSurah() {
        return this.surahInputNode.value;
    }

    setContentAtStartingAyat(content) {
        this.startingAyatNode.innerHTML = content;
    }

    setContentAtEndingAyat(content) {
        this.endingAyatNode.innerHTML = content;
    }

    setContentAtAyatArea(content) {
        this.ayatAreaNode.innerHTML = content;
    }

    hideSelectionArea() {
        this.selectionAreaNode.classList.add('hide');
    }

    appearSelectionArea() {
        this.selectionAreaNode.classList.remove('hide');
    }

    resetSelectionArea(){
        this.surahInputNode.value = '';
        this.startingAyatNode.innerHTML = '';
        this.endingAyatNode.innerHTML = '';
    }
}