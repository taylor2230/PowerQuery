<?php
include_once 'UserController.php';
include_once 'QueryController.php';
include_once 'pages/home.php';
include_once 'pages/login.php';
include_once 'pages/pq.php';
include_once 'pages/settings.php';
include_once 'pages/admin.php';

$userSession = [];
$userData = [$_POST];
$request = [$_POST][0]["page"];
$ctrl = new Controller($request);
if (session_id() == '') {
    session_start();
    if(!isset($_SESSION["isActive"])) {
        $_SESSION["isActive"] = false;
    }
}

print $ctrl->$request($userData);

class Controller
{
    //handles all requests to the server and returns as needed
    private $request;

    function __construct($request)
    {
        $this->request = $request;
    }

    function main()
    {
        //main frame component
        return home($_SESSION["isActive"]);
    }

    function siteLogin()
    {
        //site login component
        return userLogin();
    }

    function register()
    {
        //site register component
        return userRegister();
    }

    function activateUser($post)
    {
        //handles activating a user
        $temp = json_decode($post[0]["data"], true);
        $startSession = new UserController($post);
        if (count($temp) < 4) {
            $temp = $startSession->processUser();
            if ($temp !== false) {
                $_SESSION["user"] = $temp;
                $_SESSION["isActive"] = true;
                return $this->main();
            } else {
                $html = "<div class='warning'>Username or Password is incorrect; Please try again or Sign Up</div>";
                return $this->failedUser() . $html . $this->siteLogin();
            }
        } else {
            $temp = $startSession->createUser();
            if ($temp !== false) {
                $_SESSION["user"] = $temp;
                $_SESSION["isActive"] = true;
                return $this->main();
            } else {
                $html = "<div class='warning'>Username or Email is already in use</div>";
                return $this->failedUser() . $html . $this->register();
            }
        }
    }

    function failedUser()
    {
        return failedHome();
    }

    function settings()
    {
        return userSettings();
    }

    function logout()
    {
        //controls session end
        session_destroy();
        session_start();
        if(!isset($_SESSION["isActive"])) {
            $_SESSION["isActive"] = false;
        }
        return $this->main();
    }

    function pq()
    {
        //visualization component
        if ($_SESSION["isActive"] === false) {
            $html = "<div class='warning'>Please Sign up or Login to access this functionality</div>";
            return $html . $this->siteLogin();
        } else {
            return visualizer();
        }
    }

    function admin()
    {
        if($_SESSION["user"][1] === "0") {
            $html = "<div class='warning'>This functionality requires administrative credentials...</div>";
            return $html . $this->siteLogin();
        } else {
            return mightyMorphin();
        }
    }

    function processQuery()
    {
        $data = json_decode([$_POST][0]["data"], true);

        if(!isset($data["query"])) {
            return limitedHome($_SESSION["isActive"]) . mightyMorphin() . "<div class='warning'>Request failed please try again</div>";
        } elseif(isset($data["query"])) {
            $processor = new QueryController($data["query"]);
            return limitedHome($_SESSION["isActive"]) . mightyMorphin() . $processor->queryData();
        } else {
            return limitedHome($_SESSION["isActive"]) . mightyMorphin();
        }
    }

    function processUserChange()
    {
        $data = json_decode([$_POST][0]["data"], true);
        if(isset($data["email"])) {
            $data["email"] !== "" ? setEmail($data["email"]) : null;
        }
        if(isset($data["password"])) {
            $data["password"] !== "" ? setPassword(password_hash($data["password"], PASSWORD_DEFAULT)) : null;
        }
        return limitedHome($_SESSION["isActive"]) . userSettings();
    }

}

