<?php
ini_set("soap.wsdl_cache_enable", "0");

$client = new SoapClient('http://soap/soap_shop/server/mySoap5.wsdl');

if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    try
    {
        if ($_POST['allCars'])
        {
            echo $client->getAllCars();
        }

        if ($_POST['idCar'])
        {
            $id = $_POST['idCar'];
            echo $client->getCarById($id);
        }

        if ($_POST['orderCar'])
        {
            $obj = $_POST['orderCar'];
            echo $client->getOrderCar($obj);
        }

        if ($_POST['searchCar'])
        {
            $obj = $_POST['searchCar'];
            echo $client->getCarsByParams($obj);
        }
    }
    catch (SoapFault $fault)
    {
        echo $fault->getMessage();
    }
}
?>
