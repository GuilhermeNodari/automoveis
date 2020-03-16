<?php

include_once 'componentes.class.php';

if (isset($_POST['id'])) {

    $componentes = new Componentes();
    $componentes->id = $_POST['id'];
    $componentes->componente = trim($_POST['componente']);
    $componentes->adicionar();

    header("Location: Javascript:editarComponente();");

} else if (isset($_POST['acao'])) {

    $componentes = new Componentes();
    $dados = $componentes->listar();
    echo json_encode($dados);

}


?>