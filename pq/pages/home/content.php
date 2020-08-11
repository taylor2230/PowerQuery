<?php
include "UserContent.php";

function content($isActive)
{
    //parent component
    return banner($isActive) . lower();
}

function banner($bool)
{
    //banner component
    $html = "<div class='banner'>";
    if ($bool) {
        $userDoc = new UserContent($_SESSION["user"][0]);
        $html .= $userDoc->userDocuments();
    } else {
        $html .= "<div class='sub-banners'><text>Enter.</text><img src='pq/pages/home/assets/data2.png'></div>";
        $html .= "<div class='sub-banners'><text>Build.</text><img src='pq/pages/home/assets/line.png'></div>";
        $html .= "<div class='sub-banners'><text>Explore.</text><img src='pq/pages/home/assets/state.png'></div>";
    }

    $html .= "</div>";
    return $html;
}

function lower()
{
    //lower component
    $html = "<div class='lower'>";
    $html .= "<div class='sub-lower'><text>Create the {Data}.</text>
                <p>Pick the chart to start the visualization experience </p></div>";
    $html .= "<div class='sub-lower'><text>Select the {Chart}.</text>
                <p>Enter the data in the fields for the visualization to display</p></div>";
    $html .= "<div class='sub-lower'><text>Display the {Visual}.</text>
                <p>From columns and rows to a simple but powerful visualization</p></div>";
    $html .= "</div>";
    return $html;
}
