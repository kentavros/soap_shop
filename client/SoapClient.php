<?php
ini_set("soap.wsdl_cache_enable", "0");

$client = new SoapClient('http://soap/soap_shop/server/mySoap5.wsdl');

if ($_SERVER['REQUEST_METHOD'] == "POST")
{
    if ($_POST['allCars']){
        try
        {
            echo $client->getAllCars();
        }
        catch (SoapFault $fault)
        {
            echo $fault->getMessage();
        }
    }

    if ($_POST['idCar'])
    {
        try
        {
            $id = $_POST['idCar'];
            echo $client->getCarById($id);
        }
        catch (SoapFault $fault)
        {
            echo $fault->getMessage();
        }
    }
    if ($_POST['orderCar'])
    {
        try
        {
            $obj = $_POST['orderCar'];
            echo $client->getOrderCar($obj);
        }
        catch (SoapFault $fault)
        {
            echo $fault->getMessage();
        }
    }
}



////var_dump($client->__getFunctions());
//echo $client->getAllCars();
//echo '<br>';
//echo $client->getCarById(2);
//echo '<br>';
////var_dump($client->getOrderCar('{"id_car":"1", "f_name":"Fedia", "l_name":"Teponov", "payment":"cash"}'));
//echo '<br>';
//
//try{
//    //echo $client->getCarsByParams('{"year":"1987", "brand":"Vaz"}');
//}
//catch (SoapFault $exception)
//{
//    echo $exception->getMessage();
//}


?>
