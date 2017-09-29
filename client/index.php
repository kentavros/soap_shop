<?php
ini_set("soap.wsdl_cache_enable", "0");

$client = new SoapClient('http://192.168.0.15/~user6/SOAP/soap_shop/server/soap.wsdl');


print_r($client->__getFunctions());

//$client->getAllCars();

var_dump($client->getAllCars());

//var_dump($client->getCarById(1));
//var_dump($client->__getLastRequest());
//var_dump($client->__getLastResponse());
?>
