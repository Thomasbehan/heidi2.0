'use strict';
import {
    MDCTopAppBar
} from "@material/top-app-bar";
import angular from 'angular';
import 'ngstorage';
import 'angular-route';

var notheidi = angular.module('notheidi', ['ngRoute', 'ngStorage']);

import homeConfig from "./pages/home/home.js";

notheidi.config(homeConfig);
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    nodejs.start('./server.js', function (success) {
        console.log("nodejs started");
//        console.log(success);
    });
}
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar')); topAppBar.setScrollTarget(document.getElementById('main-content')); topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});
