<?php


class QueryTool
{
    //handles all query operations
    /**
     * @var mysqli
     */
    private $msqli;

    function __construct()
    {
        //$this->msqli = new mysqli('localhost', 'ics325su2028', '7223', 'ics325su2028');
        $this->msqli = new mysqli('localhost', 'verifyaccess', '33GUk2R3cfvaXaly', "user_info");
    }

    function insert($query)
    {
        return $this->msqli->query($query);
    }

    function fetch($query)
    {
       return $this->msqli->query($query)->fetch_array();
    }

    function fetchLimited($query)
    {
        return $this->msqli->query($query)->fetch_all();
    }

    function fetchDefinitions($query)
    {
        return $this->msqli->query($query)->fetch_fields();
    }

    function close()
    {
        $this->msqli->close();
    }

}
