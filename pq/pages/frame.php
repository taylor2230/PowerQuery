<?php

class Framer
{
    private $page;

    function __construct($page)
    {
        $this->page = $page;
    }

    function aFrame()
    {
        //top frame
        $html = "<section class='nav'>";
        $html .= "<div class='title'>";
        $html .= "<svg viewBox='0 0 100 80' width='40' height='40'>";
        $html .= "<rect width='60' height='10' fill='white'></rect>";
        $html .= "<rect y='20' width='80' height='10' fill='white'></rect>";
        $html .= "<rect y='40' width='50' height='10' fill='white'></rect>";
        $html .= "</svg>";
        $html .= "<a class='nav-home' target='_self' href='#home' onclick='page(\"body\",\"pq/Controller.php\",\"main\")'>power{Query}</a>";
        $html .= "</div>";
        $html .= "<a class='nav-link' target='_self' href='#visualize' onclick='page(\"core\",\"pq/Controller.php\",\"pq\")'>Visualize</a>";
        $html .= "<a class='nav-link' target='_self' href='#login' onclick='page(\"core\",\"pq/Controller.php\",\"siteLogin\")'>LOGIN</a>";
        $html .= "<a class='nav-link' target='_self' href='#signup' onclick='page(\"core\",\"pq/Controller.php\",\"register\")'>SIGN UP</a>";
        $html .= "</section>";

        return $html;
    }

    function aFrameAlt($user, $admin)
    {
        //active user
        $html = "<section class='nav'>";
        $html .= "<div class='title'>";
        $html .= "<svg viewBox='0 0 100 80' width='40' height='40'>";
        $html .= "<rect width='60' height='10' fill='white'></rect>";
        $html .= "<rect y='20' width='80' height='10' fill='white'></rect>";
        $html .= "<rect y='40' width='50' height='10' fill='white'></rect>";
        $html .= "</svg>";
        $html .= "<a class='nav-home' target='_self' href='#home' onclick='page(\"body\",\"pq/Controller.php\",\"main\")'>power{Query}</a>";
        $html .= "</div>";
        $html .= "<span class='active-user'>Welcome: $user</span>";
        $html .= "<a class='nav-link' target='_self' href='#home' onclick='page(\"body\",\"pq/Controller.php\",\"main\")'>Home</a>";
        $html .= "<a class='nav-link' target='_self' href='#visualize' onclick='page(\"core\",\"pq/Controller.php\",\"pq\")'>Visualize</a>";
        $html .= "<a class='nav-link' target='_self' href='#profile' onclick='page(\"core\",\"pq/Controller.php\",\"settings\")'>Profile</a>";
        ($admin === "1") ? ($html .= "<a class='nav-link' target='_self' href='#syscmd' onclick='page(\"core\",\"pq/Controller.php\",\"admin\")'>SysCmd</a>") : null;
        $html .= "<a class='nav-link' target='_self' href='#loggedout' onclick='page(\"body\",\"pq/Controller.php\",\"logout\")'>LOGOUT</a>";
        $html .= "</section>";

        return $html;
    }

    function bFrame($body)
    {
        return "<section class='core' id='core'>$body</section>";
    }

    function wrapperStart($class)
    {
        return "<div class='{$class}'>";
    }

    function wrapperEnd()
    {
        return "</div>";
    }

    function button($type, $class)
    {
        return "<button class='{$class}' type='submit' onclick='data(\"body\",\"" . $type . "\",\"pq/Controller.php\")'>Submit</button>";
    }

    function customButton($class, $label)
    {
        return "<button class='{$class}' type='submit' onclick='buildRequest();'>{$label}</button>";
    }

}

class VisualizationFrame extends Framer
{
    public function __construct($page)
    {
        parent::__construct($page);
    }

    function pqBar()
    {
        $html = "<div class='data-group'><label class='data-label' for='1'>1</label>
                    <input class='data-box' id='1' type='text' name='1' autocomplete='no' placeholder='<group>'>
                    <input class='data-box' id='1' type='number' name='1' autocomplete='no' placeholder='<number>'></div>";
        $html .= "<div class='data-group'><label class='data-label' for='2'>2</label>
                    <input class='data-box' id='2' type='text' name='2' autocomplete='no' placeholder='<group>'>
                    <input class='data-box' id='2' type='number' name='2' autocomplete='no' placeholder='<number>'></div>";
        $html .= "<div class='data-group'><label class='data-label' for='3'>3</label>
                    <input class='data-box' id='3' type='text' name='3' autocomplete='no' placeholder='<group>'>
                    <input class='data-box' id='3' type='number' name='3' autocomplete='no' placeholder='<number>'></div>";
        return $html;
    }

    function vizArea()
    {

    }

    function cmdButton($class, $label, $num)
    {
        return "<button class='{$class}' type='submit' onclick='dataModify($num)'>{$label}</button>";
    }

    function vizOpt()
    {
        $html = "  <select class='pq-opts' onchange='assist()'>
                        <option disabled selected value> select a visual </option>
                        <optgroup label='Bar Charts'>
                            <option value='generic-bar'>Bar Chart</option>
                            <option value='stacked-bar'>Stacked Bar Chart</option>
                            <option value='stacked--hor-bar'>Stacked Horizontal Bar Chart</option>
                            <option value='horizontal-bar'>Horizontal Bar Chart</option>
                            <option value='zoomable-bar'>Zoombable Bar Chart</option>
                        </optgroup>
                        <optgroup label='Line Charts'>
                            <option value='generic-line'>Line Chart</option>
                        </optgroup>
                        <optgroup label='Pie Charts'>
                            <option value='generic-pie'>Pie Chart</option>
                            <option value='donut-pie'>Donut Chart</option>
                        </optgroup>
                  </select>";
        return $html;
    }

}

class Login extends Framer
{
    public function __construct($page)
    {
        parent::__construct($page);
    }

    function accessForm()
    {
        $html = "<div class='form-group'><label class='form' for='username'>Username</label>
                    <input class='form-box' id='username' type='text' name='username' autocomplete='username' required></div>";
        $html .= "<div class='form-group'><label class='form' for='password'>Password</label>
                    <input class='form-box' id='password' type='password' name='password' autocomplete='password' required></div>";
        return $html;
    }
}

class Register extends Login
{
    public function __construct($page)
    {
        parent::__construct($page);
    }

    function extendedForm()
    {
        $html = "<div class='form-group'><label class='form' for='email'>Email</label>
                    <input class='form-box' id='email' type='email' required></div>";
        $html .= $this->accessForm();
        return $html;
    }
}

class Settings extends Framer {

    public function __construct($page)
    {
        parent::__construct($page);
    }

    function accessForm()
    {
        $html = "<div class='form-group'><label class='form' for='email'>Change Recovery Email</label>
                    <input class='form-box' id='email' type='email' name='email' autocomplete='email'></div>";
        $html .= "<div class='form-group'><label class='form' for='password'>Change Password</label>
                    <input class='form-box' id='password' type='text' name='password' autocomplete='password'></div>";
        return $html;
    }

    function currentEmail($email)
    {
        return "<span class='form-group'>Current Email: " . $email[0][0] . "</span>";
    }
}

class Admin extends Framer
{
    private $admins;
    private $users;

    public function __construct($page)
    {
        parent::__construct($page);
        $this->admins = [];
        $this->users = [];
    }

    function currentSessions()
    {
        $sessions = scandir(session_save_path());
        return "<div class='dashboard'><text>Active</text><span>" . count($sessions) . "</span></div>";
    }

    function registeredUsers($data)
    {
        $cnt = count($data);
        return "<div class='dashboard'><text>Users</text><span>" . count($data) . "</span></div>";
    }

    function systemSpace()
    {
        $disk = disk_free_space("/");
        return "<div class='dashboard'><text>Disk</text><span>" . floor($disk/ 1024 / 1024 / 1024) . "GB</span></div>";
    }

    function textbox()
    {
        return "<textarea class='query-text' id='query' wrap='soft' placeholder='Select a predefined query or type a custom one here...'></textarea>";
    }


    function control($button, $num)
    {
        return "<button class='predefined' type='submit' onclick='query($num)'>{$button}</button>";
    }
}
