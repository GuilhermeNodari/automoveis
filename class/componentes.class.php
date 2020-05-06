<?php

include_once 'db.class.php';

class Componentes extends Database{

    private $idComponente;
    private $componente;

    private $stmt;

    public function __set($atrib, $valor) {
        $this->$atrib = $valor;
    }

    public function __get($atrib) {
        return $this->$atrib;
    }

    public function __destruct() {
        $this->stmt = null;
    }


    public function adicionar() {

        if($this->idComponente == ""){
            $sql = "INSERT INTO componentes(componentes) VALUES (:componente)";
        }else{
            $sql = "UPDATE componentes SET componentes = :componente WHERE id = $this->idComponente";
        }
                              
        $this->stmt = $this->pdo->prepare($sql);

        $this->stmt->bindParam(':componente', $this->componente, PDO::PARAM_STR);

        $this->stmt->execute();
    
    }

    public function listar($pagina, $limite) {

        $this->stmt = $this->pdo->query("SELECT * FROM componentes");
        $retorno[0] = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $pagina = is_numeric($pagina) ? $pagina * $limite : 0;

        $this->stmt = $this->pdo->query("SELECT * FROM componentes LIMIT $pagina, $limite");
        $retorno[1] = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

        return $retorno;

    }

    public function dados($id) {

        $this->stmt = $this->pdo->prepare("SELECT * FROM componentes WHERE id = :id;");

        $this->stmt->bindParam(':id', $id, PDO::PARAM_STR);

        $this->stmt->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }

    public function excluir($id) {

        $this->stmt = $this->pdo->prepare('DELETE FROM componentes WHERE id = :id');

        $this->stmt->bindParam(':id', $id, PDO::PARAM_STR); 

        $this->stmt->execute();
        return $this->stmt->rowCount();

    }

    public function lastInsert() {

        $this->stmt = $this->pdo->prepare("SELECT id FROM componentes ORDER BY id DESC LIMIT 1");

        $this->stmt->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);

    }

}

?>