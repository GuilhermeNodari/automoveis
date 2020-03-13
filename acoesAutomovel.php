<?php

include_once 'automovel.class.php';
include_once 'componentes.class.php';

if (isset($_POST['id'])) {

    $adicionais = ['arCondicionado', 'airBag', 'cdPlayer', 'direcaoHidraulica', 'vidroEletrico', 'travaEletrica', 'cambioAutomatico', 'rodasLiga', 'alarme'];

    foreach ($adicionais as $chave => $valor) {
        if (isset($_POST[$valor])) {
            $componentes[] = $valor;
        }
    }

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

    $automovel = new Automovel();
    $componente = new Componentes();
    $componente->idComponentes = $_POST['idComponentes'];
    $componente->idAutomovel = empty($_POST["id"]) ? $automovel->lastInsert()['id'] : $_POST["id"];
    $componente->componentes = implode($componentes, ';');
    $componente->adicionar();

    header('Location: home.php');

} else if (isset($_POST['idExcluir'])) {

    $id = $_POST['idExcluir'];
    $automovel = new Automovel();
    $automovel->excluir($id);

} else if (isset($_POST['idEditar'])) {
    
    $id = $_POST["idEditar"];
    $automovel = new Automovel();
    $dados = $automovel->dados($id);
    $dados = mb_convert_encoding($dados, "UTF-8", "auto"); 
    
    echo json_encode($dados);

} else {

    $pesquisa = !empty($_POST['pesquisa']) ? $_POST['pesquisa'] : '';
    $pagina = $_POST['pagina'];
    $automovel = new Automovel();
    $lista = $automovel->listar($pesquisa,$pagina);
    
    echo json_encode($lista);

}

?>