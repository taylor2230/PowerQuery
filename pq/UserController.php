<?php
include_once 'pages/login/UserLogin.php';

class UserController
{
    protected $data;
    //Controls the state of a session
    public function __construct($data)
    {
        $this->data = $data;
    }

    function processUser()
    {
        $grant = new UserLogin($this->data);
        $query = $grant->loginQuery();
        $outcome = $grant->verify($grant->sendQuery($query, 0));
        return $this->setUserState($outcome, $grant->getUserDetails());
    }

    function createUser()
    {
        $process = null;
        $reg = new UserRegister($this->data);
        $query = $reg->confirmNoDuplicates();
        $sendDetails = $query !== false ? $reg->sendQuery($query, 1) : $process = false;
        $loginQuery = $sendDetails === true ? $reg->sendQuery($reg->loginQuery(), 0) : $process = false;
        $outcome = is_array($loginQuery) ? $reg->verify($loginQuery) : $process = false;
        if($process !== null) {
            return false;
        }
        return $this->setUserState($outcome, $reg->getUserDetails());
    }

    function setUserState($response, $user)
    {
        if($response) {
            return $user;
        } else {
            return false;
        }

    }

}
