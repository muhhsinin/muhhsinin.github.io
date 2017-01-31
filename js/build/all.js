(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _data = require("./data.manager");

var _data2 = _interopRequireDefault(_data);

var _view = require("./view.manager");

var _view2 = _interopRequireDefault(_view);

var _surahList = require("./surah.list.generator");

var _surahList2 = _interopRequireDefault(_surahList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    "use strict";

    var surahListGenerator = null;
    var dataManager = null;
    var viewManager = null;
    var surah = null;
    var startingAyat = 0;
    var endingAyat = 0;
    var ayats = [];

    function initialize() {
        viewManager = new _view2.default();
        viewManager.initialize();
        viewManager.getSelectedSurahNode().addEventListener('input', checkForActivatingButton);
        viewManager.getStartingAyatNode().addEventListener('input', populateEndingAyatDropDown);
        viewManager.getEndingAyatNode().addEventListener('input', finalProcessing);
    }

    function checkForActivatingButton() {
        if (dataManager.isSurahExistByDisplayName(viewManager.getSelectedSurah())) {
            surahSelected();
        }
    }

    function surahSelected() {
        surah = dataManager.findSurahByDisplayName(viewManager.getSelectedSurah());
        populateStartingAyatDropDown();
        populateEndingAyatDropDown();
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
        for (var i = start; i <= end; i++) {
            optionHtml += '<option>' + i + '</option>';
        }return optionHtml;
    }

    function finalProcessing() {
        ayats = [];
        startingAyat = viewManager.getStartingAyat();
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
        } else if (number < 100) return '0' + number;else return '' + number;
    }

    function generate() {
        $.ajax({
            method: 'GET',
            url: 'resources/surah.list.json'
        }).done(function (output) {
            dataManager.setSurahList(surahListGenerator.generateSurahInfos(output));
            surahListGenerator.generateSurahListHtml();
        }).fail(function (output) {
            console.log('Fail to retrieve surah list');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        dataManager = new _data2.default();
        surahListGenerator = new _surahList2.default(dataManager);
        generate();
        initialize();
    });
})(); /**
       * Created by kawnayeen on 1/29/17.
       */

},{"./data.manager":2,"./surah.list.generator":4,"./view.manager":5}],2:[function(require,module,exports){
/**
 * Created by kawnayeen on 1/29/17.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataManager = function () {
    function DataManager() {
        _classCallCheck(this, DataManager);

        this.surahList = [];
    }

    _createClass(DataManager, [{
        key: "getSurahList",
        value: function getSurahList() {
            return this.surahList;
        }
    }, {
        key: "setSurahList",
        value: function setSurahList(surahList) {
            this.surahList = surahList;
        }
    }, {
        key: "isSurahExistByDisplayName",
        value: function isSurahExistByDisplayName(displayName) {
            var surahFound = false;
            for (var index = 0; index < this.surahList.length; index++) {
                if (this.surahList[index].getDisplayName() === displayName) {
                    surahFound = true;
                    break;
                }
            }
            return surahFound;
        }
    }, {
        key: "findSurahByDisplayName",
        value: function findSurahByDisplayName(displayName) {
            if (this.isSurahExistByDisplayName(displayName)) {
                for (var index = 0; index < this.surahList.length; index++) {
                    if (this.surahList[index].getDisplayName() === displayName) {
                        return this.surahList[index];
                    }
                }
            } else return null;
        }
    }]);

    return DataManager;
}();

exports.default = DataManager;

},{}],3:[function(require,module,exports){
/**
 * Created by kawnayeen on 1/31/17.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SurahInfo = function () {
    function SurahInfo(info) {
        _classCallCheck(this, SurahInfo);

        this.number = info['number'];
        this.name = info['name'];
        this.englishName = info['englishName'];
        this.numberOfAyat = info['numberOfAyahs'];
        this.displayName = '';
        this.generateDisplayName();
    }

    _createClass(SurahInfo, [{
        key: 'generateDisplayName',
        value: function generateDisplayName() {
            this.displayName = this.number + '. ' + this.englishName + ' (' + this.name + ')';
        }
    }, {
        key: 'getDisplayName',
        value: function getDisplayName() {
            return this.displayName;
        }
    }]);

    return SurahInfo;
}();

exports.default = SurahInfo;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by kawnayeen on 1/22/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _surah = require("./surah.info");

var _surah2 = _interopRequireDefault(_surah);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

"use strict";

var SurahListGenerator = function () {
    function SurahListGenerator(dataManager) {
        _classCallCheck(this, SurahListGenerator);

        this.dataManager = dataManager;
        this.surahListNodeId = 'surahList';
    }

    _createClass(SurahListGenerator, [{
        key: "generateSurahInfos",
        value: function generateSurahInfos(jsonData) {
            var temp = [];
            jsonData.forEach(function (element) {
                return temp.push(new _surah2.default(element));
            });
            return temp;
        }
    }, {
        key: "generateSurahListHtml",
        value: function generateSurahListHtml() {
            var _this = this;

            var htmlContent = '';
            this.dataManager.getSurahList().forEach(function (surah) {
                return htmlContent += _this.generateOptionTagFromSurah(surah);
            });
            var surahListNode = document.getElementById(this.surahListNodeId);
            surahListNode.innerHTML = htmlContent;
        }
    }, {
        key: "generateOptionTagFromSurah",
        value: function generateOptionTagFromSurah(surah) {
            var output = '<option value="' + surah.getDisplayName() + '">';
            return output;
        }
    }]);

    return SurahListGenerator;
}();

exports.default = SurahListGenerator;

},{"./surah.info":3}],5:[function(require,module,exports){
/**
 * Created by kawnayeen on 1/31/17.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewManager = function () {
    function ViewManager() {
        _classCallCheck(this, ViewManager);

        this.surahInputId = 'selectedSurah';
        this.startingAyatId = 'startingAyat';
        this.endingAyatId = 'endingAyat';
        this.ayatAreaId = 'ayatArea';
        this.surahInputNode = null;
        this.startingAyatNode = null;
        this.endingAyatNode = null;
        this.ayatAreaNode = null;
    }

    _createClass(ViewManager, [{
        key: 'initialize',
        value: function initialize() {
            this.surahInputNode = document.getElementById(this.surahInputId);
            this.startingAyatNode = document.getElementById(this.startingAyatId);
            this.endingAyatNode = document.getElementById(this.endingAyatId);
            this.ayatAreaNode = document.getElementById(this.ayatAreaId);
        }
    }, {
        key: 'getStartingAyatNode',
        value: function getStartingAyatNode() {
            return this.startingAyatNode;
        }
    }, {
        key: 'getEndingAyatNode',
        value: function getEndingAyatNode() {
            return this.endingAyatNode;
        }
    }, {
        key: 'getStartingAyat',
        value: function getStartingAyat() {
            return parseInt(this.startingAyatNode.value);
        }
    }, {
        key: 'getEndingAyat',
        value: function getEndingAyat() {
            return parseInt(this.endingAyatNode.value);
        }
    }, {
        key: 'getSelectedSurahNode',
        value: function getSelectedSurahNode() {
            return this.surahInputNode;
        }
    }, {
        key: 'getSelectedSurah',
        value: function getSelectedSurah() {
            return this.surahInputNode.value;
        }
    }, {
        key: 'setContentAtStartingAyat',
        value: function setContentAtStartingAyat(content) {
            this.startingAyatNode.innerHTML = content;
        }
    }, {
        key: 'setContentAtEndingAyat',
        value: function setContentAtEndingAyat(content) {
            this.endingAyatNode.innerHTML = content;
        }
    }, {
        key: 'setContentAtAyatArea',
        value: function setContentAtAyatArea(content) {
            this.ayatAreaNode.innerHTML = content;
        }
    }]);

    return ViewManager;
}();

exports.default = ViewManager;

},{}]},{},[1]);
