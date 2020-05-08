<?php

include_once 'callFunctions.php';

switch ($_POST['funcao']) {
    case 'listar':
        $pesquisa = !empty($_POST['pesquisa']) ? $_POST['pesquisa'] : '';
        $limite = 5;
        echo listarAutomoveis($pesquisa, $_POST['pagina'], $limite, $_POST['ordem'], $_POST['coluna']);
        break;
    case 'cadastrar':
        cadastrarAutomovel($_POST['automovel'], $_POST['componentes']);
        break;
    case 'editar':
        echo editarAutomovel($_POST['idEditar']);
        break;
    case 'excluir':
        echo excluirAutomovel($_POST['idExcluir']);
        break;
    case 'excluirSelecionados':
        echo excluirAutomoveisSelecionados($_POST['automoveisSelecionados']);
}

?>