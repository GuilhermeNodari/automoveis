<?php

class Componentes{
    private $idComponentes;
    private $idAutomovel;
    private $componentes;

    private $pdo;
    private $stmt;

    public function __set($atrib, $valor) {
        $this->$atrib = $valor;
    }

    public function __get($atrib) {
        return $this->$atrib;
    }

    public function __construct() {
        
        try {
            $this->pdo = new PDO('mysql:host=localhost;dbname=lista_automoveis', 'root', 'asdf000');
        } catch(PDOException $e) {
            echo 'Erro gerado: ' . $e->getMessage(); 
        }

    }

    public function adicionar() {

        if($this->idComponentes == ""){
            $sql = "INSERT INTO componentes(idAutomovel, componentes) VALUES (:idAutomovel, :componentes)";
        }else{
            $sql = "UPDATE componentes SET idAutomovel = :idAutomovel, componentes = :componentes WHERE id=$this->idComponentes";
        }
                              
        $this->stmt = $this->pdo->prepare($sql);

        $this->stmt->bindParam(':idAutomovel', $this->idAutomovel, PDO::PARAM_STR);
        $this->stmt->bindParam(':componentes', $this->componentes, PDO::PARAM_STR);
                                              
        $this->stmt->execute();
    
    }

}

?>