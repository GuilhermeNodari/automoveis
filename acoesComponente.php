<?php

include_once 'class/componentes.class.php';

if (isset($_POST['idComponente'])) {

    $componentes = new Componentes();
    $componentes->idComponente = $_POST['idComponente'];
    $componentes->componente = trim($_POST['componente']);
    $componentes->adicionar();

    header("Location: home.php#componentes");

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