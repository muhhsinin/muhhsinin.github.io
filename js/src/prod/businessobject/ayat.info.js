/**
 * Created by kawnayeen on 2/10/17.
 */
"use strict";

const recitationHost = 'http://www.everyayah.com/data/Alafasy_64kbps/';
const resourceHost = 'resources/ayat/';

export default class AyatInfo {
    constructor(surahNumber, ayatNumber) {
        this.surahNumber = surahNumber;
        this.ayatNumber = ayatNumber;
        this._surahId = window.util.to3digitString(this.surahNumber);
        this._ayatId = window.util.to3digitString(this.ayatNumber);
        this.arabicText = null;
        this.englishTranslation = null;
        this.ayatSerial = 0;
        this.recitationUrl = this.generateRecitationUrl();
    }

    generateRecitationUrl() {
        return `${recitationHost}${this.getUniqueIdentifier()}.mp3`;
    }

    getResourceUrl() {
        return `${resourceHost}${this._surahId}/${this.getUniqueIdentifier()}.json`;
    }

    getUniqueIdentifier() {
        return `${this._surahId}${this._ayatId}`;
    }

    getRecitationUrl() {
        return this.recitationUrl;
    }

    isValid() {
        return this.arabicText !== null && this.englishTranslation !== null;
    }

    getArabicText() {
        return this.arabicText;
    }

    getEnglishTranslation() {
        return this.englishTranslation;
    }

    getSurahNumber() {
        return this.surahNumber;
    }

    getAyatNumber() {
        return this.ayatNumber;
    }

    getAyatSerial() {
        return this.ayatSerial;
    }

    setArabicText(arabicText) {
        this.arabicText = arabicText;
    }

    setEnglishTranslation(englishTranslation) {
        this.englishTranslation = englishTranslation;
    }

    setAyatSerial(ayatSerial) {
        this.ayatSerial = ayatSerial;
    }
}