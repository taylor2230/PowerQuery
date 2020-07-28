<?php

include_once 'frame.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/PowerQuery/pq/QueryTool.php';

//include_once '/home/students/ics325su20/ics325su2028/public_html/phase3/PowerQuery/pq/QueryTool.php';

function userSettings() {
    $buildRails = new Settings("settings");
    $site = $buildRails->wrapperStart("settings");
    $site .= $buildRails->currentEmail(getEmail());
    $site .= $buildRails->accessForm();
    $site .= $buildRails->button("processUserChange", 0);
    $site .= $buildRails->wrapperEnd();
    return $site;
}

function getEmail() {
    $query = new QueryTool();
    $response =  $query->fetchLimited("SELECT email FROM pq_user_login WHERE username='" . $_SESSION["user"][0]. "'");
    $query->close();
    return $response;
}

function setEmail($email) {
    $query = new QueryTool();
    $response = $query->insert("UPDATE pq_user_login SET email='{$email}' WHERE username='" . $_SESSION["user"][0]. "'");
    $query->close();
    return $response;
}

function setPassword($password) {
    $query = new QueryTool();
    $response = $query->insert("UPDATE pq_user_login SET password='{$password}' WHERE username='" . $_SESSION["user"][0]. "'");
    $query->close();
    return $response;
}
