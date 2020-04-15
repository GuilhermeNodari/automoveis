<?php

include_once 'class/componentes.class.php';

if (isset($_POST['componentes'])) {

    $arrayComponente = [];

    for($k=0; $k < count($_POST['componentes']); $k++){
        $componente = $_POST['componentes'][$k];
        $arrayComponente += [$componente['name'] => $componente['value']]; 
    }

    $componentes = new Componentes();
    $componentes->idComponente = $arrayComponente['idComponente'];
    $componentes->componente = trim($arrayComponente['componente']);
    $dados = $componentes->adicionar();
    
    echo json_encode($componentes->lastInsert());

} else if (isset($_POST['listar'])) {

    $componentes = new Componentes();
    $dados = $componentes->listar();

    echo json_encode($dados);

} else if (isset($_POST['idEditar'])) {
    
    $id = $_POST["idEditar"];
    $componentes = new Componentes();
    $dados = $componentes->dados($id); 
    
    echo json_encode($dados);

} else {

    $id = $_POST['idExcluir'];
    $componentes = new Componentes();
    $retorno = $componentes->excluir($id);

    echo json_encode($retorno);

}

?>