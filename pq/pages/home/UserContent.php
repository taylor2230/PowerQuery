<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PowerQuery/pq/QueryTool.php';

//include_once '/home/students/ics325su20/ics325su2028/public_html/phase3/PowerQuery/pq/QueryTool.php';

class UserContent
{
    protected $user;
    private $query;

    public function __construct($user)
    {
        $this->user = $user;
        $this->query = new QueryTool();
    }

    function userDocuments()
    {
        $documents =  $this->query->fetchLimited("SELECT * FROM pq_user_files WHERE username='" . $this->user . "'");
        if(is_array($documents) && count($documents) > 0) {
            $html = "<div class='documents'>";
            $html .= "<span>Saved Data</span>";
            for($i = 0; $i < count($documents);$i++) {
                $html .= "<li class='documents-list'><a href='#opendocument' onclick='reloadRequest(this)'>" .
                    $documents[$i][2] . " - " . $documents[$i][4] ."</a></li>";
            }
            $html .= "</div>";
            return $html;
        } else {
            return $this->noUserDocuments();
        }

    }

    function noUserDocuments()
    {
        $html = "<div class='documents'>";
        $html .= "<span>It's looking a bit {empty} in here!</span>";
        $html .= "<li class='documents-list'>
                  <a href='#visualize' onclick='page(\"core\",\"pq/Controller.php\",\"pq\")'>Get Started here</a></li>";
        $html .= "</div>";
        return $html;
    }
}
