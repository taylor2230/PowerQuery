<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/PowerQuery/pq/QueryTool.php';

//include_once '/home/students/ics325su20/ics325su2028/public_html/phase3/PowerQuery/pq/QueryTool.php';

class UserLogin
{
    //controls the user logging into the system
    //returns operation outcome
    protected $json;
    /**
     * @var mysqli
     */
    protected $msqli;
    protected $password;
    protected $username;
    /**
     * @var array
     */
    protected $userDetails;

    public function __construct($json)
    {
        $this->json = (json_decode($json[0]["data"], true));
        $this->query = new QueryTool();
        if (isset($this->json["password"])) {
            $this->password = $this->json["password"];
        }
        if (isset($this->json["username"])) {
            $this->username = $this->json["username"];
        }
        $this->userDetails = Array();
    }

    function getUserDetails()
    {
        return $this->userDetails;
    }

    function loginQuery()
    {
        return "SELECT * FROM pq_user_login WHERE username='" . $this->username . "'";
    }

    function sendQuery($request, $type)
    {
        return $type === 0 ? $this->query->fetch($request) : $this->query->insert($request);
    }


    function verify($results)
    {
        if (isset($results["username"])) {
            if($results["username"] === $this->username && password_verify($this->password, $results["password"])) {
                array_push($this->userDetails, $results["username"], $results["isAdmin"]);
                $this->query->close();
                return true;
            } else {
                $this->query->close();
                return false;
            }
        } else {
            return false;
        }
    }
}

class UserRegister extends UserLogin
{
    //applies the logic of the user login and adds what is needed for a user to register
    private $email;
    private $passwordSubmit;
    public function __construct($json)
    {
        parent::__construct($json);
        if (!empty($this->json["password"])) {
            $this->passwordSubmit = password_hash($this->json["password"], PASSWORD_DEFAULT);
        }
        if (isset($this)) {
            $this->email = $this->json["email"];
        }
    }

    function checkNewEmail() {
        $query = "SELECT * FROM pq_user_login WHERE email='" . $this->email . "'";
        return parent::sendQuery($query, 0);
    }

    function insertUser()
    {
        return "INSERT INTO pq_user_login (username, password, email) VALUES ('$this->username', '$this->passwordSubmit', '$this->email')";
    }

    function confirmNoDuplicates()
    {
        return $this->sendQuery(parent::loginQuery(), 0) || $this->checkNewEmail() ? false : $this->insertUser();
    }
}
