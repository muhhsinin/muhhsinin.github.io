/**
 * Created by kawnayeen on 2/10/17.
 */
"use strict";

const recitationHost = 'http://www.everyayah.com/data/Alafasy_64kbps/';

export default class AyatInfo {
    constructor(surahId, ayatNumber, surahNumber) {
        this.surahNumber = surahNumber;
        this.surahId = surahId;
        this.ayatNumber = ayatNumber;
        this.recitationUrl = `${recitationHost}${this.surahId}${this.ayatNumber}.mp3`;
        this.arabicText = null;
        this.englishTranslation = null;
        this.ayatSerial = 0;
    }

    getUniqueIdentifier() {
        return `${this.surahId}${this.ayatNumber}`;
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

    getAyatNumber(){
        return this.ayatNumber;
    }

    getAyatSerial(){
        return this.ayatSerial;
    }

    setArabicText(arabicText) {
        this.arabicText = arabicText;
    }

    setEnglishTranslation(englishTranslation) {
        this.englishTranslation = englishTranslation;
    }

    setAyatSerial(ayatSerial){
        this.ayatSerial = ayatSerial;
    }
}