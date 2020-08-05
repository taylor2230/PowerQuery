<?php

include_once 'frame.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/PowerQuery/pq/QueryTool.php';

//include_once '/home/students/ics325su20/ics325su2028/public_html/phase3/PowerQuery/pq/QueryTool.php';

function mightyMorphin()
{
    $buildRails = new Admin("admin");
    $site = "<div class='banner-dashboard'>";
    $site .= $buildRails->currentSessions();
    $site .= $buildRails->registeredUsers(zordon());
    $site .= $buildRails->systemSpace();
    $site .= "</div>";
    $site .= "<div class='lower-admin'><span>quick{Query}</span>";
    $site .= "<div class='lower-dashboard'>";
    $site .= $buildRails->control("List Admins", 0);
    $site .= $buildRails->control("Add Admin", 1);
    $site .= $buildRails->control("Remove Admin", 2);
    $site .= $buildRails->control("List Users", 3);
    $site .= $buildRails->control("Remove User", 4);
    $site .= $buildRails->control("Remove User Data", 5);
    $site .= $buildRails->control("Flush Privileges", 6);
    $site .= "</div>";
    $site .= $buildRails->textbox();
    $site .= $buildRails->button("processQuery", "submit");
    $site .= $buildRails->wrapperEnd();
    $site .= $buildRails->wrapperStart("admin");
    $site .= "</div>";
    return $site;
}

function zordon()
{
    $query = new QueryTool();
    return $query->fetchLimited("SELECT id,username,email,isAdmin FROM pq_user_login");
}

function alpha()
{
    $query = new QueryTool();
    return $query->fetchDefinitions("SELECT id,username,email,isAdmin FROM pq_user_login");
}
