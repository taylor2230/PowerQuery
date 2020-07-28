<?php
include_once 'QueryTool.php';
include_once 'pages/admin.php';

class QueryController
{
    protected $request;
    private $query;

    public function __construct($request)
    {
        $this->request = $request;
        $this->query = new QueryTool();
    }

    function processRequest()
    {
        if ($_SESSION["user"][1] === "1") {
            if (preg_match("/^SELECT/i", $this->request)) {
                return $this->query->fetchLimited($this->request);
            } else {
                return $this->query->insert($this->request);
            }
        } else {
            return "You do not have permission to perform this action";
        }
    }

    function queryData()
    {
        $site = null;
        $response = $this->processRequest();
        if (is_array($response) && $_SESSION["user"][1] === "1") {
            $site = $this->tableStart();
            $site .= $this->tableHeaders($this->query->fetchDefinitions($this->request));
            $site .= $this->returnDetails($response);
            $site .= $this->tableEnd();
        } else {
            $site =  $response;
        }
        return $site;
    }

    function tableStart()
    {
        return "<table class='information'>";
    }

    function tableEnd()
    {
        return "</table>";
    }

    function returnDetails($details)
    {
        $html = null;
        for ($i = 0; $i < count($details); $i++) {
            $html .= $this->tableBuilder($details[$i]);
        }
        return $html;

    }

    function tableHeaders($headers)
    {
        $html = "<tr class='tbl-row'>";
        for ($i = 0; $i < count($headers); $i++) {
            $html .= "<td>" . $headers[$i]->name . "</td>";
        }
        $html .= "</tr>";
        return $html;
    }

    function tableBuilder($row)
    {
        $html = "<tr class='tbl-row'>";
        for ($i = 0; $i < count($row); $i++) {
            $html .= "<td>" . $row[$i] . "</td>";
        }
        $html .= "</tr>";
        return $html;
    }

}
