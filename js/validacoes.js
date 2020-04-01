function validar(event) {

    var descricao = $('#descricao').val().trim();
    var placa = $('#placa').val().replace('-','').trim();
    var renavan = $('#renavan').val().trim();
    var ano_modelo = $('#ano_modelo').val().trim();
    var ano_fabricacao = $('#ano_fabricacao').val().trim();
    var cor = $('#cor').val().trim();
    var km = $('#km').val().replace('.','').trim();
    var marca = $('#marca').val().trim();
    var preco = $('#preco').val().replace('.','').replace(',','.').trim();
    var preco_fipe = $('#preco_fipe').val().replace('.','').replace(',','.').trim();

    var data = new Date();
    var ano = data.getFullYear();
    const regexLetras = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);
    var enviar = true;

    if (descricao == '') {

        $('#erro_descricao').html('');
        $('#descricao').after('<p id="erro_descricao">Descrição vazia!</p>');
        $('#erro_descricao').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_descricao').html('');
    }

    if (placa == '') {

        $('#erro_placa').html('');
        $('#placa').after('<p id="erro_placa">Placa vazia!</p>');
        $('#erro_placa').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if(placa.length != 7) {

        $('#erro_placa').html('');
        $('#placa').after('<p id="erro_placa">Placa inválida!</p>');
        $('#erro_placa').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_placa').html('');
    }

    if (renavan == '') {

        $('#erro_renavan').html('');
        $('#renavan').after('<p id="erro_renavan">Código RENAVAN vazio!</p>');
        $('#erro_renavan').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_renavan').html('');
    }

    if (ano_modelo == '') {

        $('#erro_modelo').html('');
        $('#ano_modelo').after('<p id="erro_modelo">Ano do modelo vazio!</p>');
        $('#erro_modelo').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (ano_modelo.length != 4) {

        $('#erro_modelo').html('');
        $('#ano_modelo').after('<p id="erro_modelo">Ano do modelo inválido!</p>');
        $('#erro_modelo').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if(ano_modelo > ano) {

        $('#erro_modelo').html('');
        $('#ano_modelo').after('<p id="erro_modelo">Ano do modelo inválido!</p>');
        $('#erro_modelo').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_modelo').html('');
    }

    if (ano_fabricacao == '') {

        $('#erro_fabricacao').html('');
        $('#ano_fabricacao').after('<p id="erro_fabricacao">Ano de fabricação vazio!</p>');
        $('#erro_fabricacao').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (ano_fabricacao.length != 4) {

        $('#erro_fabricacao').html('');
        $('#ano_fabricacao').after('<p id="erro_fabricacao">Ano de fabricação inválido!</p>');
        $('#erro_fabricacao').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (ano_fabricacao > ano) {

        $('#erro_fabricacao').html('');
        $('#ano_fabricacao').after('<p id="erro_fabricacao">Ano de fabricação inválido!</p>');
        $('#erro_fabricacao').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (ano_fabricacao > ano_modelo) {

        $('#erro_fabricacao').html('');
        $('#ano_fabricacao').after('<p id="erro_fabricacao">Ano de fabricação inválido!</p>');
        $('#erro_fabricacao').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_fabricacao').html('');
    }

    if (cor == '') {

        $('#erro_cor').html('');
        $('#cor').after('<p id="erro_cor">Cor vazia!</p>');
        $('#erro_cor').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (!regexLetras.test(cor)) {

        $('#erro_cor').html('');
        $('#cor').after('<p id="erro_cor">Cor inválida!</p>');
        $('#erro_cor').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_cor').html('');
    }

    if (km == '') {

        $('#erro_km').html('');
        $('#km').after('<p id="erro_km">Quilometragem vazia!</p>');
        $('#erro_km').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (isNaN(km)) {

        $('#erro_km').html('');
        $('#km').after('<p id="erro_km">Quilometragem não permite letras!</p>');
        $('#erro_km').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_km').html('');
    }

    if (marca == '') {

        $('#erro_marca').html('');
        $('#marca').after('<p id="erro_marca">Marca vazia!</p>');
        $('#erro_marca').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (!regexLetras.test(marca)) {

        $('#erro_marca').html('');
        $('#marca').after('<p id="erro_marca">Marca não permite números ou símbolos!</p>');
        $('#erro_marca').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_marca').html('');
    }

    if (preco == '') {

        $('#erro_preco').html('');
        $('#preco').after('<p id="erro_preco">Preço vazio!</p>');
        $('#erro_preco').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (isNaN(preco)) {

        $('#erro_preco').html('');
        $('#preco').after('<p id="erro_preco">Preço não permite letras!</p>');
        $('#erro_preco').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_preco').html('');
    }

    if (preco_fipe == '') {

        $('#erro_precofipe').html('');
        $('#preco_fipe').after('<p id="erro_precofipe">Preço FIPE vazio!</p>');
        $('#erro_precofipe').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else if (isNaN(preco_fipe)) {

        $('#erro_precofipe').html('');
        $('#preco_fipe').after('<p id="erro_precofipe"Preço FIPE não permite letras!</p>');
        $('#erro_precofipe').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_precofipe').html('');
    }
    
    if (!enviar) {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
}

function validarComponente(event) {

    var componente = $('#componente').val().trim();
    var enviar = true;

    if (componente == '') {

        $('#erro_componente').html('');
        $('#componente').after('<p id="erro_componente">Componente vazio!</p>');
        $('#erro_componente').css({
            'color': 'red',
            'font-size': '15px'
          });
        enviar = false;

    } else {
        $('#erro_componente').html('');
    }

    if (!enviar) {
        event.preventDefault();
        return false;
    } else {
        return true;
    }

}