<?php
include 'libs/config.php';
include 'libs/function.php';
try
{
    $cars = new Cars();

}
catch (PDOException $exception)
{
    echo $exception->getMessage();
}
echo '<pre>';
//var_dump($cars->getAllCars());
echo '</pre>';

try
{
//    $cars->getCarsByParam(23);
}
catch (Exception $exception)
{
    echo $exception->getMessage();
}
$cars->getCarsByParam(23);