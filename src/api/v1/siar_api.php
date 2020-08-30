<?php
ini_set("display_errors",1);
require_once("config.php");

class siar{
    public $mysqli;
    
    function __construct(){
        $this->mysqli = new mysqli(HOST,USER,PWD,DB) or die(mysqli_connect_error());
    }

    function init(){
        echo "<p>initializing...</p>";
        $con = $this->mysqli;
        $check = $con->query("show tables");
         echo "<p>checking tables...</p>";
        if($check && mysqli_num_rows($check) > 0){
             echo "<p>Got tables...</p>";
            $tables = mysqli_fetch_array($check);
             echo "<p>looking for user table...</p>";
            if(!in_array('user',$tables)){
                 echo "<p>not found...creating user table...</p>";
                $sql = "create table user(id bigint auto_increment primary key, username varchar(16) not null, first_name varchar(255) not null, middle_name varchar(255),last_name varchar(255) not null, password varchar(255) not null,email varchar(255),phone varchar(255) not null, dob bigint, ranking int(2), position varchar(255),date_created bigint,date_modified bigint,last_login bigint)";
                $q = $con->query($sql);
                if($q){
                    $sql2 = "insert into user(username,first_name,last_name,password,email,phone,date_created,date_modified) values('admin','System','Administrator','".password_hash('NoPassword1',PASSWORD_BCRYPT)."','support@neelansoft.co.tz','+255784086726',".time().",".time().")";
                }
            }
            else{
                $sql2 = "insert into user(username,first_name,last_name,password,email,phone,date_created,date_modified) values('admin','System','Administrator','".password_hash('NoPassword1',PASSWORD_BCRYPT)."','support@neelansoft.co.tz','+255784086726',".time().",".time().")";
            }
        }
        else{
            $sql = "create table user(id bigint auto_increment primary key, username varchar(16) not null, first_name varchar(255) not null, middle_name varchar(255),last_name varchar(255) not null, password varchar(255) not null,email varchar(255),phone varchar(255) not null, dob bigint, ranking int(2), position varchar(255),date_created bigint,date_modified bigint,last_login bigint)";
                $q = $con->query($sql);
                if($q){
                    $sql2 = "insert into user(username,first_name,last_name,password,email,phone,date_created,date_modified) values('admin','System','Administrator','".password_hash('NoPassword1',PASSWORD_BCRYPT)."','support@neelansoft.co.tz','+255784086726',".time().",".time().")";
                }
        }
        $init = $con->query($sql2);
        if($init){
            return true;
        }
        return false;
    }
    function getAllUsers(){
        $users = array();
        $result = array();
        $sql = "select * from user order by first_name asc";
        $con = $this->mysqli;
        $query = $con->query($sql);
        if($query && mysqli_num_rows($query) > 0){
            while($row = mysqli_fetch_assoc($query)){
                unset($row['password']);
                $users[] = $row;
            }
            $result['success'] = 0;
            $result['msg'] = "Query successful";
            $result['users'] = $users;
            return $result;
        }
        else{
            $result['success'] = 1;
            $result['msg'] = "Could not retrieve any user";
            $result['users'] = $users;
            return $result;
        }
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