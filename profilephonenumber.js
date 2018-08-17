// ==UserScript==
// @copyright    Copyright IBM Corp. 2017
//
// @name         profilephonenumber
// @version      0.1
// @description  Enable Phone Number to be a TEL: Link
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

            // here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
            // before we proceed to customize the page...
            waitFor(function () {
                // wait until the "loading..." node has been hidden

                // here we go - number just below big name
                //	dojo.query("span.shareSome-title")[0].textContent="Willkommen beim UCaaS PoC für Sievert AG! ";
                var mydiv = document.getElementById("businessCardDetails").children[0];
                var number = document.getElementById("businessCardDetails").children[0].textContent;
                var aTag = document.createElement('a');
                aTag.setAttribute('href', "TEL://"+number);
                aTag.innerHTML = "Anrufen";
                mydiv.appendChild(aTag);
                
            // Numbers in "ContactInfo"
            // The following spans look as this: 
            // Original:  <span data-phone-type=\"telephone\"> +4932212297325</span>
            // Target:    <span data-phone-type=\"telephone\"> +4932212297325</span>
            

            // office
            var mySpan = "";
            
            mySpan = document.getElementById("_contactInfo_profileDetails_widget_container").children[0].children[0].children[0].children[1].children[1].children[0].children[0].innerHTML;
            number = mySpan.innerHTML;
            myNumberLink = "<span data-phone-type=\"telephone\"><a href='TEL://"+number+"'>Anrufen<A></span>";
            document.getElementById("_contactInfo_profileDetails_widget_container").children[0].children[0].children[0].children[1].children[1].children[0].children[0].innerHTML=myNumberLink;

            //mobile
            mySpan = document.getElementById("_contactInfo_profileDetails_widget_container").children[0].children[0].children[0].children[2].children[1].children[0].children[0].innerHTML;
            number = mySpan.innerHTML;
            myNumberLink = "<span data-phone-type=\"telephone\"><a href='TEL://"+number+"'>Anrufen<A></span>";
            document.getElementById("_contactInfo_profileDetails_widget_container").children[0].children[0].children[0].children[1].children[1].children[0].children[0].innerHTML=myNumberLink;

            },
                ".lotusStreamTopLoading div.loaderMain.lotusHidden");
        } catch (e) {
            alert("Exception occurred in UCaaS ProfilePhoneNumbers: " + e);
        }
    });
}
