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
            'id_car'=>'', 'f_name'=>'Henri', 'l_name'=>'Nekrasov', 'payment'=>'cash'
     ];

$arr2 = [
    'year'=>'1987', 'brand'=>'Vazq', 
    ];

//var_dump($cars->getCarsByParams($arr2));

//var_dump($cars->getOrderCar($arr));
