// ==UserScript==
// @copyright    Copyright IBM Corp. 2019
//
// @name         home.js
// @version      0.5
// @description  Redirect home page to meeting page
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


            
            var redirectTo = 'https://apps.ce.collabserv.com/meetings/sthome';
            
            var path = document.location.pathname;
            if (path.indexOf("/sthome") != -1) {

            document.location=redirectTo;
 
}
