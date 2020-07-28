<?php
include_once 'frame.php';

function userLogin()
{
    $buildRails = new Login("login");
    $site = $buildRails->wrapperStart("log");
    $site .= $buildRails->accessForm();
    $site .= $buildRails->button("activateUser", 0);
    $site .= $buildRails->wrapperEnd();
    return $site;
}

function userRegister()
{
    $buildRails = new Register("register");
    $site = $buildRails->wrapperStart("log");
    $site .= $buildRails->extendedForm();
    $site .= $buildRails->button("activateUser", 0);
    $site .= $buildRails->wrapperEnd();
    return $site;
}
