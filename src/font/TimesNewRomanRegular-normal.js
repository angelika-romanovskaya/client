﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('TimesNewRomanRegular-normal.ttf', font);
this.addFont('TimesNewRomanRegular-normal.ttf', 'TimesNewRomanRegular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])