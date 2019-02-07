// ==UserScript==
// @copyright    Copyright IBM Corp. 2019
//
// @name         meetingsISTA.js
// @version      0.4
// @description  Change meeting page
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
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function (callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if (!elXpathRoot) var elXpathRoot = dojo.body();
                if (!maxInter) var maxInter = 10000;  // number of intervals before expiring
                if (!waitTime) var waitTime = 1;  // 1000=1 second
                if (!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval(function () {
                    if (++waitInter < maxInter && !dojo.query(elXpath, elXpathRoot).length) return;

                    clearInterval(intId);
                    if (waitInter >= maxInter) {
                        console.log("**** WAITFOR [" + elXpath + "] WATCH EXPIRED!!! interval " + waitInter + " (max:" + maxInter + ")");
                    } else {
                        console.log("**** WAITFOR [" + elXpath + "] WATCH TRIPPED AT interval " + waitInter + " (max:" + maxInter + ")");
                        callback();
                    }
                }, waitTime);
            };

            var redirectTo = 'https://www.ista.com/de/';
            
            // document.location.pathname.indexOf('/sthome')
            var path = document.location.pathname;
            if (path.indexOf("/sthome") != -1) {
            
                // here we use waitFor to wait on #accesListA element
                // before we proceed to customize the page...
                waitFor(function () {
                    // wait until the "loading..." node has been hidden

                    // Change link to meetings phone number page
                    document.getElementById('accessListA').onclick = function() { window.open(redirectTo); };

                    // remove header
                    //document.'nav_bar_include'.display = 'none';

                    // show that we are active
                    // document.'lotusText VerseHeadingText'.text = 'ista Meetings';

                    // check
                    // prompt("Numberlink changed");

                },
                "#accessListA");
               };
               if(path.indexOf('/globalnumbers.jsp') != -1) {
                   // prompt("GlobalNumbers!");
                   document.location=redirectTo;
               } else { 
                   // prompt("GlobalNumbers Not Found")
               };
                   
           } catch (e) {
            alert("Exception occurred in changeNumberPage: " + e);
        }
    });
}
