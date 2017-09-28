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

$arr = [
    'year'=>'1938', 'model'=>'traKtorec4835', 'brand'=>'TracKtorFigaktor',
     'engine'=>'3500', 'color'=>'RED', 'max_speed'=>'800', 'price'=>4000 
     ];

$arr2 = [
    'year'=>'1987', 'model'=>'2108', 
    ];

var_dump($cars->getCarsByParams($arr2));
