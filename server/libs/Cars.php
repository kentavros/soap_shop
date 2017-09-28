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
            throw new Exception(ERR_QUERY);
        }
        return $sth->fetchAll(PDO::FETCH_ASSOC);
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
            throw new Exception(ERR_QUERY);
        }
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * поиск по параметрам (в качестве параметров используется тот
     * же комплекс type что и в предыдущем запросе. Поле «год выпуска» - обязательно),
     * @param $arrParams
     */
    public function getCarsByParam($arrParams)
    {
        if(!isset($arrParams['year']) )
        {
            throw new Exception(ERR_PARAMS);
        }

    }
}