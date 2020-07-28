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
        $html .= "<div class='sub-banners'><text>Upload.</text><img src='pq/pages/home/assets/bar.png'></div>";
        $html .= "<div class='sub-banners'><text>Explore.</text><img src='pq/pages/home/assets/state.png'></div>";
        $html .= "<div class='sub-banners'><text>Visualize.</text><img src='pq/pages/home/assets/line.png'></div>";
    }

    $html .= "</div>";
    return $html;
}

function lower()
{
    //lower component
    $html = "<div class='lower'>";
    $html .= "<div class='sub-lower'><text>Create.</text><p>Placeholder text for how to upload</p></div>";
    $html .= "<div class='sub-lower'><text>Design.</text><p>Placeholder text for how to create</p></div>";
    $html .= "<div class='sub-lower'><text>Interact.</text><p>Placeholder text for how to create</p></div>";
    $html .= "</div>";
    return $html;
}
