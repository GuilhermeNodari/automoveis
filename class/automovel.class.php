<?php

include_once 'db.class.php';

class Automovel extends Database{
    private $id;
    private $descricao;
    private $placa;
    private $renavan;
    private $ano_modelo;
    private $ano_fabricacao;
    private $cor;
    private $km;
    private $marca;
    private $preco;
    private $preco_fipe;

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

        if($this->id == ''){
            $sql = "INSERT INTO automoveis(descricao, placa, renavan, ano_modelo, ano_fabricacao, cor, km, marca, preco, preco_fipe) VALUES (:descricao, :placa, :renavan, :ano_modelo, :ano_fabricacao, :cor, :km, :marca, :preco, :preco_fipe)";
        }else{
            $sql = "UPDATE automoveis SET descricao = :descricao, placa = :placa, renavan = :renavan, ano_modelo = :ano_modelo, ano_fabricacao = :ano_fabricacao, cor = :cor, km = :km, marca = :marca, preco = :preco, preco_fipe = :preco_fipe WHERE id = $this->id";
        }
                              
        $this->stmt = $this->pdo->prepare($sql);

        $placa = strtoupper($this->placa);
        $this->stmt->bindParam(':descricao', $this->descricao, PDO::PARAM_STR);
        $this->stmt->bindParam(':placa', $placa, PDO::PARAM_STR);
        $this->stmt->bindParam(':renavan', $this->renavan, PDO::PARAM_STR);
        $this->stmt->bindParam(':ano_modelo', $this->ano_modelo, PDO::PARAM_STR); 
        $this->stmt->bindParam(':ano_fabricacao', $this->ano_fabricacao, PDO::PARAM_STR);
        $this->stmt->bindParam(':cor', $this->cor, PDO::PARAM_STR);
        $this->stmt->bindParam(':km', $this->km, PDO::PARAM_STR);
        $this->stmt->bindParam(':marca', $this->marca, PDO::PARAM_STR);
        $this->stmt->bindParam(':preco', $this->preco, PDO::PARAM_STR);
        $this->stmt->bindParam(':preco_fipe', $this->preco_fipe, PDO::PARAM_STR);
                                              
        $this->stmt->execute();

    }

    public function excluirComponentes($idAutomovel) {

        $sql = "DELETE FROM automoveis_componentes WHERE id_automovel=:id_automovel";
        $this->stmt = $this->pdo->prepare($sql);

        $this->stmt->bindParam(':id_automovel', $idAutomovel, PDO::PARAM_STR);

        $this->stmt->execute();

    }

    public function adicionarComponentes($idAutomovel, $idComponente) {

        $sql = "INSERT INTO automoveis_componentes(id_automovel, id_componente) VALUES (:id_automovel, :id_componente)"; 
        $this->stmt = $this->pdo->prepare($sql);

        $this->stmt->bindParam(':id_automovel', $idAutomovel, PDO::PARAM_STR);
        $this->stmt->bindParam(':id_componente', $idComponente, PDO::PARAM_STR);   

        $this->stmt->execute();

    }

    public function listar($pesquisa, $pagina, $limite, $coluna, $ordem) {

        $this->stmt = $this->pdo->query("SELECT count(*) AS automoveis FROM automoveis WHERE descricao LIKE '%$pesquisa%' OR marca LIKE '%$pesquisa%'");
        $retorno[0] = $this->stmt->fetch(PDO::FETCH_ASSOC);
        
        $pagina = is_numeric($pagina) ? $pagina * $limite : 0;

        $this->stmt = $this->pdo->query("SELECT id,descricao,placa,marca FROM automoveis WHERE descricao LIKE '%$pesquisa%' OR marca LIKE '%$pesquisa%' ORDER BY $coluna $ordem LIMIT $pagina, $limite ");
        $retorno[1] = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

        return $retorno;

    }

    public function excluir($id) {

        $this->stmt = $this->pdo->prepare('DELETE FROM automoveis WHERE id = :id');
        $this->stmt->bindParam(':id', $id, PDO::PARAM_STR); 

        $this->stmt->execute();
        return $this->stmt->rowCount();

    }

    public function dadosComponentes($id) {

        $this->stmt = $this->pdo->prepare("SELECT co.id, ac.id_componente FROM automoveis_componentes AS ac INNER JOIN componentes AS co ON co.id = ac.id_componente WHERE ac.id_automovel = :id_automovel");
        $this->stmt->bindParam(':id_automovel', $id, PDO::PARAM_STR);

        $this->stmt->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }

    public function dados($id) {

        $this->stmt = $this->pdo->prepare("SELECT * FROM automoveis WHERE id = :id");
        $this->stmt->bindParam(':id', $id, PDO::PARAM_STR);

        $this->stmt->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    public function lastInsert() {

        $this->stmt = $this->pdo->prepare("SELECT id FROM automoveis ORDER BY id DESC LIMIT 1");

        $this->stmt->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);

    }

}

?>