<?php
include 'libs/config.php';
include 'libs/function.php';
//include 'libs/Cars.php';

//$db = new Cars();
//var_dump($db->getAllCars());



ini_set("soap.wsdl_cache_enabled", "0");

$server = new SoapServer("soap.wsdl");
$server->setClass("Cars");
$server->handle();

