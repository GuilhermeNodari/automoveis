<?php

include_once 'class/componentes.class.php';
include_once 'callFunctions.php';

switch ($_POST['funcao']) {
    case 'listar':
        $limite = 5;
        echo listarComponentes($_POST['pagina'], $limite);
        break;
    case 'cadastrar':
        echo cadastrarComponente($_POST['componentes']);
        break;
    case 'editar':
        echo editarComponente($_POST['idEditar']);
        break;
    case 'excluir':
        echo excluirComponente($_POST['idExcluir']);
        break;
    case 'excluirSelecionados':
        echo excluirComponentesSelecionados($_POST['componentesSelecionados']);
}

?>