<?php
include 'libs/config.php';
include 'libs/function.php';

ini_set("soap.wsdl_cache_enabled", "0");

$server = new SoapServer("mySoap5.wsdl");
$server->setClass("Cars");
$server->handle();

