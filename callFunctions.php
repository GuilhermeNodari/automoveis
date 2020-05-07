<?php

function cadastrarAutomovel($automovelCadastrado, $componenteCadastrado) {

    $arrayAutomovel = [];

    for($k=0; $k < count($automovelCadastrado); $k++){
        $automovel = $automovelCadastrado[$k];
        $arrayAutomovel += [$automovel['name'] => $automovel['value']]; 
    }

    $automovel = new Automovel();
    $automovel->id = $arrayAutomovel['id'];
    $automovel->descricao = trim($arrayAutomovel['descricao']);
    $automovel->placa = trim($arrayAutomovel['placa']);
    $automovel->renavan = trim($arrayAutomovel['renavan']);
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
    $dados = $componentes->listar(0,5);

    $automovel = new Automovel();

    if ($arrayAutomovel['atualizar'] == 'true') {
        $automovel->excluirComponentes($arrayAutomovel['id']);
    }

    foreach ($componenteCadastrado as $chave => $valor) {
        foreach ($dados[0] as $chave2 => $valor2) {
            if ($valor == $valor2['id']) {
                $id = empty($arrayAutomovel['id']) ? $automovel->lastInsert()['id'] : $arrayAutomovel['id'];
                $automovel->adicionarComponentes($id, $valor);
            }
        }
    }

}

function excluirAutomovel($id) {

    $automovel = new Automovel();
    $retorno = $automovel->excluir($id);
    return json_encode($retorno);

}

function editarAutomovel($id) {

    $automovel = new Automovel();
	$dadosComponentes = $automovel->dadosComponentes($id);
    $automovel = new Automovel();
	$dados['automovel'] = $automovel->dados($id)[0];
	$dados['componentes'] = $dadosComponentes;	
    return json_encode($dados);

}

function excluirAutomoveisSelecionados($automoveisSelecionados) {

    $automoveis = new Automovel();
    $linhasAfetadas = [];

    for($k=0; $k < count($automoveisSelecionados); $k++){
        $id = $automoveisSelecionados[$k];
        $linhasAfetadas[$id]['id'] = $id;
        $linhasAfetadas[$id]['linhaAfetada'] = $automoveis->excluir($id);
    }

    return json_encode($linhasAfetadas);

}

function listarAutomoveis($pesquisa, $pagina, $limite, $ordem, $coluna) {

    $automovel = new Automovel();
    $lista = $automovel->listar($pesquisa, $pagina, $limite, $coluna, $ordem);
    return json_encode($lista);

}

function listarComponentes($pagina, $limite) {

    $componentes = new Componentes();
    $dados = $componentes->listar($pagina, $limite);
    return json_encode($dados);

}

function cadastrarComponente($componenteCadastrado){

    $dados = [];
    $arrayComponente = [];

    for($k=0; $k < count($componenteCadastrado); $k++){
        $componente = $componenteCadastrado[$k];
        $arrayComponente += [$componente['name'] => $componente['value']]; 
    }

    $dialog = false;

    if (!empty($arrayComponente['dialog'])){
        $dialog = true;
    }

    $componentes = new Componentes();
    $componentes->idComponente = $arrayComponente['idComponente'];
    $componentes->componente = trim($arrayComponente['componente']);
    $componentes->adicionar();

    $dados = $componentes->lastInsert();
    $dados['dialog'] = $dialog;
    
    return json_encode($dados);

}

function editarComponente($id) {

    $componentes = new Componentes();
    $dados = $componentes->dados($id); 
    return json_encode($dados);

}

function excluirComponente($id) {

    $componentes = new Componentes();
    $retorno = $componentes->excluir($id);
    return json_encode($retorno);

}

function excluirComponentesSelecionados($componentesSelecionados) {

    $componentes = new Componentes();
    $linhasAfetadas = [];

    for($k=0; $k < count($componentesSelecionados); $k++){
        $id = $componentesSelecionados[$k];
        $linhasAfetadas[$id]['id'] = $id;
        $linhasAfetadas[$id]['linhaAfetada'] = $componentes->excluir($id);
    }

    return json_encode($linhasAfetadas);

}

?>