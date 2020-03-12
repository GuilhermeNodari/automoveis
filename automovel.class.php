<?php

class Automovel{
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
            echo 'Erro gerado ' . $e->getMessage(); 
        }

    }

    public function adicionar() {
        if($this->id == ''){
            $sql = "INSERT INTO automoveis(descricao, placa, renavan, ano_modelo, ano_fabricacao, cor, km, marca, preco, preco_fipe) VALUES (:descricao, :placa, :renavan, :ano_modelo, :ano_fabricacao, :cor, :km, :marca, :preco, :preco_fipe)";
        }else{
            $sql = "UPDATE automoveis SET descricao = :descricao, placa = :placa, renavan = :renavan, ano_modelo = :ano_modelo, ano_fabricacao = :ano_fabricacao, cor = :cor, km = :km, marca = :marca, preco = :preco, preco = :preco WHERE id=$this->id";
        }
                              
        $this->stmt = $this->pdo->prepare($sql);

        $this->stmt->bindParam(':descricao', $this->descricao, PDO::PARAM_STR);
        $this->stmt->bindParam(':placa', strtoupper($this->placa), PDO::PARAM_STR);
        $this->stmt->bindParam(':renavan', $this->renavan, PDO::PARAM_STR);
        $this->stmt->bindParam(':ano_modelo', $this->ano_modelo, PDO::PARAM_STR); 
        $this->stmt->bindParam(':ano_fabricacao', $this->ano_fabricacao, PDO::PARAM_STR);
        $this->stmt->bindParam(':cor', $this->cor, PDO::PARAM_STR);
        $this->stmt->bindParam(':km', $this->km, PDO::PARAM_STR);
        $this->stmt->bindParam(':marca', $this->marca, PDO::PARAM_STR);
        $this->stmt->bindParam(':preco', $this->preco, PDO::PARAM_STR);
        $this->stmt->bindParam(':preco_fipe', $this->preco_fipe, PDO::PARAM_STR);
                                              
        $this->stmt->execute();

        $this->pdo = null;
        $this->stmt = null;

    }

    public function listar($pesquisa, $pagina) {

        $consulta = $this->pdo->query("SELECT count(*) AS automoveis FROM automoveis WHERE descricao LIKE '%$pesquisa%' OR marca LIKE '%$pesquisa%'");
        $retorno[0] = $consulta->fetch(PDO::FETCH_ASSOC);
        $pagina = is_numeric($pagina) ? $pagina * 5 : 0;
        $consulta = $this->pdo->query("SELECT id,descricao,placa,marca FROM automoveis WHERE descricao LIKE '%$pesquisa%' OR marca LIKE '%$pesquisa%' LIMIT $pagina, 5 ");
        $retorno[1] = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $this->pdo = null;

        return $retorno;

    }

    public function excluir($id) {

        $this->stmt = $this->pdo->prepare('DELETE FROM componentes WHERE idAutomovel = :id; DELETE FROM automoveis WHERE id = :id');
        $this->stmt->bindParam(':id', $id, PDO::PARAM_STR); 
        $this->stmt->execute();
        $this->pdo = null;
        $this->stmt = null;

    }

    public function dados($id) {

        $consulta = $this->pdo->prepare("SELECT * FROM automoveis INNER JOIN componentes ON automoveis.id = componentes.idAutomovel WHERE automoveis.id = :id;");
        $consulta->bindParam(':id', $id, PDO::PARAM_STR);
        $consulta->execute();
        $retorno = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $this->pdo = null;
        return $retorno;
    }

    public function lastInsert() {

        $this->stmt = $this->pdo->prepare("SELECT id FROM automoveis ORDER BY id DESC LIMIT 1");
        $this->stmt->execute();
        $consulta = $this->stmt->fetch(PDO::FETCH_ASSOC);
        $this->pdo = null;
        $this->stmt = null;
        return $consulta;

    }

}

?>