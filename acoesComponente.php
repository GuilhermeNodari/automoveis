<?php

include_once 'class/componentes.class.php';

if (isset($_POST['componentes'])) {

    $dados = [];
    $arrayComponente = [];

    for($k=0; $k < count($_POST['componentes']); $k++){
        $componente = $_POST['componentes'][$k];
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
    
    echo json_encode($dados);

} else if (isset($_POST['listar'])) {

    $componentes = new Componentes();
    $pagina = $_POST['pagina'];
    $limite = 5;
    $dados = $componentes->listar($pagina, $limite);

    echo json_encode($dados);

} else if (isset($_POST['idEditar'])) {
    
    $id = $_POST["idEditar"];
    $componentes = new Componentes();
    $dados = $componentes->dados($id); 
    
    echo json_encode($dados);

} else if (isset($_POST['idExcluir'])) {

    $id = $_POST['idExcluir'];
    $componentes = new Componentes();
    $retorno = $componentes->excluir($id);

    echo json_encode($retorno);

} else {

    $componentes = new Componentes();
    $linhasAfetadas = [];

    for($k=0; $k < count($_POST['componentesSelecionados']); $k++){
        $id = $_POST['componentesSelecionados'][$k];
        $linhasAfetadas[$id]['id'] = $id;
        $linhasAfetadas[$id]['linhaAfetada'] = $componentes->excluir($id);
    }

    echo json_encode($linhasAfetadas);

}

?>