$(document).ready(function(){

    function popover() {
        adicionarPopover('popoverDescricao','A descrição serve para descrever o carro, com seu nome e motorização por exemplo');
        adicionarPopover('popoverPlaca','Digite a placa do seu carro. <br> Exemplo: XXX1234');
        adicionarPopover('popoverRenavan',' O Código RENAVAM é, hoje, um código numeral de 11 dígitos e está localizado na parte superior de sua CNH');
        adicionarPopover('popoverAnoModelo','Digite o ano do modelo do seu carro. <br> Exemplo: 2020');
        adicionarPopover('popoverAnoFabricacao','Digite o ano de fabricação do seu carro. <br> Exemplo: 2020');
        adicionarPopover('popoverCor','Digite a cor do seu carro. <br> Exemplo: Branco');
        adicionarPopover('popoverKM','Digite a quilometragem do seu carro, está localizada no painel do seu automóvel');
        adicionarPopover('popoverMarca','Digite a marca do seu carro. <br> Exemplo: Fiat');
        adicionarPopover('popoverPreco','Digite o preço que você quer ganhar do seu carro');
        adicionarPopover('popoverPrecoFipe','Digite o preço do seu carro que está na Tabela FIPE, que é a principal referência no mercado de carros usados e seminovos, além de ser usada como base para contratos e seguros. <br> Entre no site: <a href="https://veiculos.fipe.org.br/" target="_blank"> Veículos FIPE </a>');
    }

    routie({
        'listar': function() {
            $('#carousel').remove();
            listar();
        },
        'listar/:pesquisa/:pagina/:coluna/:ordem': function(pesquisa, pagina, coluna, ordem) {
            $('#carousel').remove();
            listar(pesquisa, pagina, coluna, ordem);
        },
        'cadastro': function() {
            $('#carousel').remove();
            editarCadastro();
            popover();
        },
        'editar/:id': function(id) {
            $('#carousel').remove();
            editarCadastro(id);
            popover();
        },
        'componentes': function() {
            $('#carousel').remove();
            editarComponente('', '', 1);
        },
        'componentes/:pagina': function(pagina) {
            $('#carousel').remove();
            editarComponente('', '', pagina);
        },
        'editarComponente/:id': function(id) {
            $('#carousel').remove();
            editarComponente(id, '', 1);
        },
    });

});

function esconderPopover(elemento) {

    $.each($(elemento).popover(), function(key, value) {
        $('#'+value.id).popover('hide');
    })
    
}

function adicionarPopover(id, texto) {

    $('label#'+id).append(
        $('<a>', {href:'#', id:id}).append(
            $('<i>', {class:'far fa-question-circle', style:'margin-left: 5px;'})
        ),
    );

    $('#'+id).attr({
        'data-toggle': 'popover',
        'data-html': 'true',
        'data-placement': 'right',
        'data-content': '<a href="#" style="float:right;" onClick="Javascript:esconderPopover('+id+')"> <i class="far fa-times-circle"></i> </a> <div>'+ texto + '</div>'
    });

    $('#'+id).popover();
    
    $('html').on('click', function(e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

}

function swalFire(titulo, texto, icone, resultado) {

    icone = icone == 's' ? 'success' : 'error';

    return Swal.fire({
        title: titulo,
        text: texto,
        icon: icone,
        showConfirmButton: true
    }).then((result) => {
        resultado;
    });

}