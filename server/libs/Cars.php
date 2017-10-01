<?php
class Cars
{
    private $pdo;

    public function __construct()
    {
        $pdo = new PDO(DSN_MY, USER_NAME, PASS);
        $this->pdo = $pdo;
        if (!$this->pdo)
        {
            throw new PDOException(ERR_DB);
        }
    }

    public function getAllCars()
    {
        $sql = "SELECT id, brand, model FROM cars";
        $sth = $this->pdo->prepare($sql);
        $result = $sth->execute();
        if (false === $result)
        {
            throw new SoapFault('Server', ERR_QUERY);
        }
        $data =  $sth->fetchAll(PDO::FETCH_ASSOC);
        $resJSON = json_encode($data);
        return $resJSON;
    }

    /**
     * @param $id
     */
    public function getCarById($id)
    {
        $id = $this->pdo->quote($id);
        $sql = "SELECT brand, model, year, engine, color, max_speed, price FROM cars WHERE id=".$id;
        $sth = $this->pdo->prepare($sql);
        $result = $sth->execute();
        if (false === $result)
        {
            throw new SoapFault('Server', ERR_QUERY);
        }
        $data = $sth->fetchAll(PDO::FETCH_ASSOC);
        $resJSON = json_encode($data);
        return $resJSON;
    }

    /**
     * @param $arrParams
     */
    public function getCarsByParams($arrParams)
    {
        $arrParams = json_decode($arrParams, true);
        if(empty($arrParams['year']) )
        {
            throw new SoapFault('Server', ERR_PARAMS);
        }
       
        $year = $this->pdo->quote($arrParams['year']);
        $where = $year;
        if (!empty($arrParams['brand']))
        {
            $brand = $this->pdo->quote($arrParams['brand']);
            $where .= " AND brand=".$brand;
        }
        if (!empty($arrParams['model']))
        {
            $model = $this->pdo->quote($arrParams['model']);
            $where .= " AND model=".$model;
        }
        if (!empty($arrParams['engin']))
        {
            $engin = $this->pdo->quote($arrParams['engin']);
            $where .= " AND engin=".$engin;
        }
        if (!empty($arrParams['color']))
        {
            $color = $this->pdo->quote($arrParams['color']);
            $where .= " AND color=".$color;
        }
        if (!empty($arrParams['max_speed']))
        {
            $max_speed = $this->pdo->quote($arrParams['max_speed']);
            $where .= " AND max_speed=".$max_speed;
        }
        if (!empty($arrParams['price']))
        {
            $price = $this->pdo->quote($arrParams['price']);
            $where .= " AND price=".$price;
        }
        $sql = "SELECT brand, model, year, engine, color, max_speed, price FROM cars WHERE year=".$where;
        $sth = $this->pdo->prepare($sql);
        $result = $sth->execute();
        if (false === $result)
        {
            throw new SoapFault('Server', ERR_QUERY);
        }
        $data = $sth->fetchAll(PDO::FETCH_ASSOC);
        $resJSON = json_encode($data);
        return $resJSON;
//        return $data;
    }

    public function getOrderCar($arrParams)
    {
        $arrParams = json_decode($arrParams, true);
        if (!empty($arrParams['id_car']) && !empty($arrParams['f_name']) && !empty($arrParams['l_name']) && !empty($arrParams['payment']))
        {
            $id_car = $this->pdo->quote($arrParams['id_car']);
            $f_name = $this->pdo->quote($arrParams['f_name']);
            $l_name = $this->pdo->quote($arrParams['l_name']);
            $payment = $this->pdo->quote($arrParams['payment']);
            $sql = "INSERT INTO orders (id_car, f_name, l_name, payment) VALUES  (".$id_car.", ".$f_name.", ".$l_name.", ".$payment.")";
            $count = $this->pdo->exec($sql);
            return $count;
        }
        else 
        {
            throw new SoapFault('Server', ERR_FIELDS);
        } 
    }
}
