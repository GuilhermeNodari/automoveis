<?php

class Componentes{
    private $idComponente;
    private $componente;

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
            $this->pdo = new PDO('mysql:host=localhost;dbname=lista_automoveis', 'root', '');
        } catch(PDOException $e) {
            echo 'Erro gerado: ' . $e->getMessage(); 
        }

    }

    public function adicionar() {

        if($this->idComponente == ""){
            $sql = "INSERT INTO componentes(componentes) VALUES (:componente)";
        }else{
            $sql = "UPDATE componentes SET componentes = :componente WHERE id=$this->idComponente";
        }
                              
        $this->stmt = $this->pdo->prepare($sql);
        $this->stmt->bindParam(':componente', $this->componente, PDO::PARAM_STR);                           
        $this->stmt->execute();
    
    }

    public function listar() {

        $consulta = $this->pdo->prepare("SELECT * FROM componentes");
        $consulta->execute();
        $retorno = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $this->pdo = null;
        return $retorno;

    }

    public function dados($id) {

        $consulta = $this->pdo->prepare("SELECT * FROM componentes WHERE id = :id;");
        $consulta->bindParam(':id', $id, PDO::PARAM_STR);
        $consulta->execute();
        $retorno = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $this->pdo = null;
        return $retorno;
        
    }

    public function excluir($id) {

        $this->stmt = $this->pdo->prepare('DELETE FROM componentes WHERE id = :id');
        $this->stmt->bindParam(':id', $id, PDO::PARAM_STR); 
        $this->stmt->execute();
        $this->pdo = null;
        $this->stmt = null;

    }

}

?>