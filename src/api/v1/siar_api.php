<?php
ini_set("display_errors",1);
require_once("../config.php");

class siar{
    public $mysqli;
    
    function __construct(){
        $this->mysqli = new mysqli(HOST,USER,PWD,DB);
    }

    function init(){
        $con = $this->mysqli;
        $sql = "insert into user(user_id,first_name,last_name,password,email,phone,date_created,date_modified) values('admin','System','Administrator','".password_hash('NoPassword1',PASSWORD_BCRYPT)."','support@neelansoft.co.tz','+255784086726',".time().",".time().")";
        $init = $con->query($sql);
        if($init){
            return true;
        }
        return false;
    }

    function getUserWithId($id){
        $con = $this->mysqli;
        $sql = "select * from user where id=".$id;
        $q = $con->query($sql);
        if($q && mysqli_num_rows($q) > 0){
            return mysqli_fetch_assoc($q);
        }
        else return false;
    }
    function getUserWithUsername($username){
        $con = $this->mysqli;
        $sql = "select * from user where username='".$username."'";
        $q = $con->query($sql);
        if($q && mysqli_num_rows($q) > 0){
            return mysqli_fetch_assoc($q);
        }
        else return false;
    }
    function signin($username,$password){
        $result = array();
        $con = $this->mysqli;
        $user = $this->getUserWithUsername($username);
        if(!$user){
            $result['success'] = 1;
            $result['msg'] = "Incorrect user ID and password";
            return $result;
            
        }
        else{
            if(password_verify($password,$user['password'])){
                $result['success'] = 0;
                $result['msg'] = "Login successful";
                unset($user['password']);
                $result['user'] = $user;
                return $result;
            }
            else{
                $result['success'] = 1;
            $result['msg'] = "Incorrect user ID and password";
            return $result;
            }
        }
    }
    function createUser($user){
        $con = $this->mysqli;
        $result = array();
        if(is_array($user)){
            if(!$this->getUserWithUsername($user['username'])){
                $sql = "insert into user(";
                $fields = "";
                $values=" values(";
                foreach($user as $key => $value){
                    if($key == 'password'){
                        $fields .= $key .",";
                        $hash = password_hash($value,PASSWORD_BCRYPT);
                        $values .= "'".$hash."',";
                    }
                    else{
                        $fields .= $key .",";
                        if(is_string($value)) $values .= "'".$value."',";
                        else $values .= $value .",";
                    }
                }
                $fields .= 'date_created,date_modified)';
                $values .= time().','.time().')';
    
                $sql .= $fields . $values;
                $query = $con->query($sql);
                if($query){
                    $insert_id = $con->insert_id;
                    $result['success'] = 0;
                    $result['msg'] = "User successfully created";
                    $result['user'] = $this->getUserWithId($insert_id);
                    return $result;
                }
                else{
                    $result['success'] = 1;
                    $result['msg'] = "Sorry! Could not create user";
                    return $result;
                }
            }
            else{
                $result['success'] = 1;
                $result['msg'] = "This user already exists";
                return $result;
            }
        }
    }
}





?>