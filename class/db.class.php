<?php

class Database {

    public $pdo;

    public function __construct() {
        try {
            $this->pdo = new PDO('mysql:host=localhost;dbname=lista_automoveis', 'root', '');
        } catch(PDOException $e) {
            echo 'Erro gerado: ' . $e->getMessage(); 
        }
    }
    
    public function __destruct() {
        $this->pdo = null;
    }

}

?>