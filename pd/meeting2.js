// ==UserScript==
// @copyright    Copyright IBM Corp. 2019
//
// @name         meeting.js
// @version      0.5
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

              // utility function to let us wait for a specific element of the page to load...
            var waitForStyle = function (callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if (!elXpathRoot) var elXpathRoot = dojo.body();
                if (!maxInter) var maxInter = 5000;  // number of intervals before expiring
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
          
            
            var redirectTo = 'https://cpd.partnerschaft-deutschland.de/wikis/home?lang=de-de#!/wiki/Telefon-%20%26%20Videokonferenzen/page/Willkommen%20bei%20Telefon-%20%26%20Videokonferenzen';
            
            var path = document.location.pathname;
            if (path.indexOf("/sthome") != -1) {
                console.log("sthome start");
                // here we use waitFor to wait on #accesListA element
                // before we proceed to customize the page...
                waitFor(function () {
                    // wait until the "loading..." node has been hidden
                    // Change link to meetings phone number page
                    var link = document.getElementById('accessListA');
                    if (link) {
                        link.onclick = function() { window.open(redirectTo); };
                    };           
                 // hide header
                 // document.getElementById('nav_bar_include').style.display="none";
                 console.log("sthome 1");
 
                 document.getElementsByClassName('lotusTitleBar2')[0].style.display="none";
                    // hide caption
                 //document.getElementsByClassName("lotusHeading")[0].style.display="none";
                    // hide footer
                 //document.getElementsByClassName("lotusFooter")[0].style.display="none";
                    // show page after all changes are done
                    
                  
                    
                  // new waitfor  
                    
       waitForStyle(function () {             
                 console.log("sthome audioprovision");
           
                 var audio = document.getElementById("provisonPCA");
                    
              
                 
                    // auto provision audio conferencing
                if (audio) {
                        console.log("sthome audioprovision2"+audio.style.display);
           
                    if(audio.style.display!="none"){
                      doProvisionAudioNew();
                    console.log("sthome audioprovision-new provision was initiated");
                    }
                    else {
                        console.log("sthome audioprovision-user already provisioned for audio");
                    }
                        ;
                   };                      
       },"#provisonPCA");          
                    
                // end new waitfor    
                    
                    var bodyNode = dojo.query('body.lotusui30')[0];
                    dojo.addClass(bodyNode, 'all-loaded');
           
                    // check
                console.log("sthome end");         
                    
                },
                "#code"); // waiting for meeting room id
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
