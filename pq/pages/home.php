<?php

include_once 'frame.php';
include 'home/content.php';

function home($isActive)
{
    $buildRails = new Framer("home");
    $isActive ? ($site = $buildRails->aFrameAlt($_SESSION["user"][0], $_SESSION["user"][1])) : ($site = $buildRails->aFrame());
    $site .= $buildRails->bFrame(content($isActive));
    return $site;
}

function failedHome() {
    $buildRails = new Framer("home");
    return $buildRails->aFrame();
}

function limitedHome($isActive) {
    $buildRails = new Framer("home");
    $isActive ? ($site = $buildRails->aFrameAlt($_SESSION["user"][0], $_SESSION["user"][1])) : ($site = $buildRails->aFrame());
    return $site;
}



