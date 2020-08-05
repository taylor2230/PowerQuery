<?php
include_once 'frame.php';

function visualizer()
{
    $buildRails = new VisualizationFrame("pq");
    $site = $buildRails->wrapperStart("pq");
    $site .= $buildRails->wrapperStart("pq-data");
    $site .= $buildRails->vizOpt();
    $site .= $buildRails->pqBar();
    $site .= $buildRails->wrapperStart("pq-data-btns");
    $site .= $buildRails->wrapperStart("pq-data-cmd");
    $site .= $buildRails->cmdButton("pq-cmd", "Add Row", 0);
    $site .= $buildRails->cmdButton("pq-cmd", "Add Column", 1);
    $site .= $buildRails->cmdButton("pq-cmd", "Edit Data", -1);
    $site .= $buildRails->wrapperEnd();
    $site .= $buildRails->customButton("pq-viz", "Save");
    $site .= $buildRails->customButton("pq-viz", "Build");
    $site .= $buildRails->wrapperEnd();
    $site .= $buildRails->wrapperEnd();

    $site .= $buildRails->wrapperStart("pq-area");
    $site .= "<div class='warning'>Select a Chart for Data Requirements</div>";
    $site .= $buildRails->wrapperEnd();

    $site .= $buildRails->wrapperEnd();
    return $site;
}
