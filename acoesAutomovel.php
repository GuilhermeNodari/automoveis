<?php

include_once 'automovel.class.php';
include_once 'componentes.class.php';

if (isset($_POST['id'])) {

    $automovel = new Automovel();
    $automovel->id = $_POST['id'];
    $automovel->descricao = trim($_POST['descricao']);
    $automovel->placa = trim($_POST['placa']);
    $automovel->renavan = trim($_POST['renavan']);
    $automovel->ano_modelo = trim($_POST['ano_modelo']);
    $automovel->ano_fabricacao = trim($_POST['ano_fabricacao']);
    $automovel->cor = trim($_POST['cor']);
    $km = str_replace('.', '', $_POST['km']);
    $automovel->km = trim($km);
    $automovel->marca = trim($_POST['marca']);
    $preco = str_replace('.', '', $_POST['preco']);
    $preco = str_replace(',', '.', $preco);
    $automovel->preco = trim($preco);
    $precoFipe = str_replace('.', '', $_POST['preco_fipe']);
    $precoFipe = str_replace(',', '.', $precoFipe);
    $automovel->preco_fipe = trim($precoFipe);
    $automovel->adicionar();

    $componentes = new Componentes();
    $dados = $componentes->listar();

    $automovel = new Automovel();

    if ($_POST['atualizar'] == 'true') {
        $automovel->excluirComponentes($_POST['id']);
    }

    foreach ($_POST as $chave => $valor) {
        foreach ($dados as $chave2 => $valor2) {
            if ($chave == $valor2['id']) {
                $id = empty($_POST['id']) ? $automovel->lastInsert()['id'] : $_POST['id'];
                $automovel->adicionarComponentes($id, $chave);
            }
        }
    }

    header('Location: home.php#listar');

} else if (isset($_POST['idExcluir'])) {

    $id = $_POST['idExcluir'];
    $automovel = new Automovel();
    $automovel->excluir($id);

} else if (isset($_POST['idEditar'])) {
    
    $id = $_POST["idEditar"];

    $automovel = new Automovel();
	$dadosComponentes = $automovel->dadosComponentes($id);
    $automovel = new Automovel();
	$dados['automovel'] = $automovel->dados($id)[0];
	$dados['componentes'] = $dadosComponentes;
	
    echo json_encode($dados);

} else {

    $pesquisa = !empty($_POST['pesquisa']) ? $_POST['pesquisa'] : '';
    $pagina = $_POST['pagina'];
    $ordem = $_POST['ordem'];
    $coluna = $_POST['coluna'];
    $automovel = new Automovel();
    $lista = $automovel->listar($pesquisa, $pagina, $coluna, $ordem);
    
    echo json_encode($lista);

}

?>