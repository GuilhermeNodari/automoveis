<?php

include_once 'class/automovel.class.php';
include_once 'class/componentes.class.php';

if (isset($_POST['automovel'])) {

    $arrayAutomovel = [];

    for($k=0; $k < count($_POST['automovel']); $k++){
        $automovel = $_POST['automovel'][$k];
        $arrayAutomovel += [$automovel['name'] => $automovel['value']]; 
    }

    $automovel = new Automovel();
    $automovel->id = $arrayAutomovel['id'];
    $automovel->descricao = trim($arrayAutomovel['descricao']);
    $automovel->placa = trim($arrayAutomovel['placa']);
    $automovel->renavan = trim($arrayAutomovel['renavan']);
    var_dump($automovel->renavan);
    $automovel->ano_modelo = trim($arrayAutomovel['ano_modelo']);
    $automovel->ano_fabricacao = trim($arrayAutomovel['ano_fabricacao']);
    $automovel->cor = trim($arrayAutomovel['cor']);
    $km = str_replace('.', '', $arrayAutomovel['km']);
    $automovel->km = trim($km);
    $automovel->marca = trim($arrayAutomovel['marca']);
    $preco = str_replace('.', '', $arrayAutomovel['preco']);
    $preco = str_replace('.', '', $preco);
    $preco = str_replace(',', '.', $preco);
    $automovel->preco = trim($preco);
    $precoFipe = str_replace('.', '', $arrayAutomovel['preco_fipe']);
    $precoFipe = str_replace('.', '', $precoFipe);
    $precoFipe = str_replace(',', '.', $precoFipe);
    $automovel->preco_fipe = trim($precoFipe);
    $automovel->adicionar();
    
    $componentes = new Componentes();
    $dados = $componentes->listar();

    $automovel = new Automovel();

    if ($arrayAutomovel['atualizar'] == 'true') {
        $automovel->excluirComponentes($arrayAutomovel['id']);
    }

    foreach ($_POST['componentes'] as $chave => $valor) {
        foreach ($dados as $chave2 => $valor2) {
            if ($valor == $valor2['id']) {
                $id = empty($arrayAutomovel['id']) ? $automovel->lastInsert()['id'] : $arrayAutomovel['id'];
                $automovel->adicionarComponentes($id, $valor);
            }
        }
    }

} else if (isset($_POST['idExcluir'])) {

    $id = $_POST['idExcluir'];
    $automovel = new Automovel();
    $retorno = $automovel->excluir($id);

    echo json_encode($retorno);

} else if (isset($_POST['idEditar'])) {
    
    $id = $_POST["idEditar"];

    $automovel = new Automovel();
	$dadosComponentes = $automovel->dadosComponentes($id);
    $automovel = new Automovel();
	$dados['automovel'] = $automovel->dados($id)[0];
	$dados['componentes'] = $dadosComponentes;
	
    echo json_encode($dados);

} else if (isset($_POST['automoveisSelecionados'])) {
    
    $automoveis = new Automovel();
    $linhasAfetadas = [];
    
    for($k=0; $k < count($_POST['automoveisSelecionados']); $k++){
        $id = $_POST['automoveisSelecionados'][$k];
        $linhasAfetadas[$id]['id'] = $id;
        $linhasAfetadas[$id]['linhaAfetada'] = $automoveis->excluir($id);
    }  
  
    echo json_encode($linhasAfetadas);
    
} else {

    $pesquisa = !empty($_POST['pesquisa']) ? $_POST['pesquisa'] : '';
    $pagina = $_POST['pagina'];
    $limite = 5;
    $ordem = $_POST['ordem'];
    $coluna = $_POST['coluna'];
    $automovel = new Automovel();
    $lista = $automovel->listar($pesquisa, $pagina, $limite, $coluna, $ordem);
    
    echo json_encode($lista);

}

?>