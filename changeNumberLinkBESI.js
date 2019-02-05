// ==UserScript==
// @copyright    Copyright IBM Corp. 2019
//
// @name         changeNumberLinkBESI.js
// @version      0.3
// @description  Change link to phone number page
//
// @namespace  http://ibm.com
//
// @author       Volker Juergensen
//
// @include      *://apps.collabservintegration.com/homepage/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

if (typeof (dojo) != "undefined") {
    require(["dojo/domReady!"], function () {
        try {


            // Change link to meetings phone number page
            document.getElementById('accessListA').onclick = function() { window.open('https://www.heise.de'); };
            // check
            // prompt("Numberlink changed");

        } catch (e) {
            alert("Exception occurred in changeNumberPage: " + e);
        }
    });
}
