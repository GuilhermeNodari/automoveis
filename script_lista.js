$(document).ready(function(){
    listar();
});

function editarCadastro(id) {
    $('.lista').hide();
    $('.pagination').hide();
    $('.form').html('');
    $('.form').append(
        $('<div>', {class:'container'}).append(
            $('<h1>', {style:'text-align:center'}).append('Dados Cadastrais'),
            $('<hr>'),
            $('<form>', {action:'acoesAutomovel.php', method:'POST', id:'form'}).append(
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-4'}).append(
                        $('<input>', {type:'hidden', class:'form-control', id:'id', name:'id'}),
                        $('<label>', {for:'descricao'}).append('Descrição'),
                        $('<input>', {type:'text', class:'form-control', id:'descricao', name:'descricao'})
                    ),
                    $('<div>', {class:'form-group col-md-4'}).append(
                        $('<label>', {for:'placa'}).append('Placa'),
                        $('<input>', {type:'text', class:'form-control', id:'placa', name:'placa'})
                    ),
                    $('<div>', {class:'form-group col-md-4'}).append(
                        $('<label>', {for:'renavan'}).append('Código RENAVAN'),
                        $('<input>', {type:'text', class:'form-control', id:'renavan', name:'renavan'})
                    ),
                ),
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'ano_modelo'}).append('Ano do Modelo'),
                        $('<input>', {type:'text', class:'form-control', id:'ano_modelo', name:'ano_modelo'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'ano_fabricacao'}).append('Ano de Fabricação'),
                        $('<input>', {type:'text', class:'form-control', id:'ano_fabricacao', name:'ano_fabricacao'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'cor'}).append('Cor'),
                        $('<input>', {type:'text', class:'form-control', id:'cor', name:'cor'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'km'}).append('KM'),
                        $('<input>', {type:'text', class:'form-control', id:'km', name:'km'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'marca'}).append('Marca'),
                        $('<input>', {type:'text', class:'form-control', id:'marca', name:'marca'})
                    ),
                ),
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'preco'}).append('Preço'),
                        $('<input>', {type:'text', class:'form-control', id:'preco', name:'preco'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'preco_fipe'}).append('Preço Fipe'),
                        $('<input>', {type:'text', class:'form-control', id:'preco_fipe', name:'preco_fipe'})
                    ),
                ),
                $('<h1>', {style:'text-align:center'}).append('Componenetes Adicionais'),
                $('<hr>'),
                $('<input>', {type:'hidden', class:'form-control', id:'idComponentes', name:'idComponentes'}),
                $('<button>', {class:'btn btn-primary', type:'submit', style:'margin-right:10px', id:'salvar'}).append('Salvar').on('click', function() {
                    validar(event);
                }),
                $('<button>', {class:'btn btn-light', type:'button', onClick:'window.location.href = "home.php"'}).append('Voltar'),
            ),
        ),
    );

    $('#preco').mask('000.000,00', {reverse: true});
    $('#preco_fipe').mask('000.000,00', {reverse: true});
    $('#km').mask('000.000', {reverse: true});
    $('#placa').mask('AAA-0000');
    $('#ano_modelo').mask('0000');
    $('#ano_fabricacao').mask('0000');

    var adicionais = ['arCondicionado', 'airBag', 'cdPlayer', 'direcaoHidraulica', 'vidroEletrico', 'travaEletrica', 'cambioAutomatico', 'rodasLiga', 'alarme'];
    var valor = ['Ar Condicionado', 'Air Bag', 'CD Player', 'Direção Hidráulica', 'Vidro Elétrico', 'Trava Elétrica', 'Câmbio Automático', 'Rodas de Liga', 'Alarme'];

    for (var i = 0; i < adicionais.length; i++) {
        $('#idComponentes').after(
            $('<div>', {class:'custom-control custom-checkbox custom-control-inline'}).append(
                $('<input>', {type:'checkbox', class:'custom-control-input', id:adicionais[i], name:adicionais[i], value:adicionais[i]}),
                $('<label>', {class:'custom-control-label', for:adicionais[i]}).append(valor[i]),
            ),
        )
    }
    
    $('#salvar').before('<br><br>');

    if (typeof id != 'undefined') {
        $.ajax({
            type: 'POST',
            url:  'acoesAutomovel.php',
            data: {
                idEditar: id
            },
            success: function(data){
                data = JSON.parse(data);
                $.each (data, function(key, value) {
                    $('#id').val(value.idAutomovel);
                    $('#descricao').val(value.descricao);
                    $('#placa').val(value.placa);
                    $('#renavan').val(value.renavan);
                    $('#ano_modelo').val(value.ano_modelo);
                    $('#ano_fabricacao').val(value.ano_fabricacao);
                    $('#cor').val(value.cor);
                    $('#km').val(value.km);
                    $('#marca').val(value.marca);
                    $('#preco').val(value.preco);
                    $('#preco_fipe').val(value.preco_fipe);
                    $('#idComponentes').val(value.id);
                    var banco = value.componentes.split(';');
                    $.each (adicionais, function(key, valueAdicionais) {
                        $.each (banco, function(key, valueBanco) {
                            if (valueAdicionais == valueBanco) {
                                $('#'+valueBanco).attr('checked','checked');
                            }
                        });
                    });
                });
            }
        });
    }
}


function excluirCadastro(id) {
    $.ajax({
        type: 'POST',
        url:  'acoesAutomovel.php',
        data: {
            idExcluir: id
        },
        success: function(data){
            Swal.fire({
                icon: 'success',
                title: 'Excluído com sucesso!',
                showConfirmButton: true,
            }).then((result) => {
                window.location.href = 'home.php';
            })
        }
    });
}

function paginacao(retornoAjax){

    retornoAjax = JSON.parse(retornoAjax);
    var dados = retornoAjax[0]['automoveis'];
    var limite = 5;
    var paginas = Math.ceil(dados/limite);

    $('.pagination').html('');

    for (var i = 0; i < paginas; i++) {
        $('.pagination').append(
            $('<li>', {class:'page-item'}).append(
                $('<a>', {class:'page-link'}).on('click', function(){
                    listar($('#pesquisa').val(), $(this).text())
                }).append(i+1),
            ),
        )
    }

}

function listar(pesquisa, pagina) {

    $('.lista').html('');
    
    pesquisarAutomoveis(pesquisa, parseInt(pagina)-1, function(retornoAjax) {
        paginacao(retornoAjax);
        $('.lista').append(
            $('<div>', {class:'container'}).append(
                $('<h1>', {style:'text-align:center'}).append('Lista de Automóveis'),
                $('<hr>'),
                $('<div>', {class:'form-group col-md-12 input'}).append(
                    $('<input>', {type:'text', class:'form-control', id:'pesquisa', name:'pesquisa', placeholder:'Pesquise aqui por descrição ou marca'}).on('keyup', function() {
                        pesquisarAutomoveis($('#pesquisa').val(),0,function(retornoAjax) {
                            $('tbody').html('');
                            paginacao(retornoAjax);
                            retornoAjax = JSON.parse(retornoAjax);
                            if (retornoAjax[1].length > 0) {
                                $.each (retornoAjax[1], function(key, value) {
                                    $('tbody').append(
                                        $('<tr>').append(
                                            $('<td>').append(value.descricao),
                                            $('<td>').append(value.placa),
                                            $('<td>').append(value.marca),
                                            $('<td>').append(
                                                $('<a>', {href:'#'}).append(
                                                    $('<i>', {class:'fas fa-trash'}).on('click', function() {
                                                        excluirCadastro(value.id);
                                                    }),
                                                ).append(' '),
                                                $('<a>', {href:'#'}).append(
                                                    $('<i>', {class:'fas fa-pen'}).on('click', function() {
                                                        editarCadastro(value.id);
                                                    }),
                                                ),
                                            ),
                                        ),
                                    );
                                })
                            } else {
                                $('tbody').append(
                                    $('<tr>').append(
                                        $('<td>', {colspan:'5', style:'text-align:center'}).append('Não foi encontrado nenhum automóvel!')
                                    ),
                                );
                            }
                        });
                    })
                ),

                $('<table>', {class:'table table-hover'}).append(
                    $('<thead>').append(
                        $('<tr>').append(
                            $('<th>').append('Descrição'),
                            $('<th>').append('Placa'),
                            $('<th>').append('Marca'),
                            $('<th>').append('Ações')
                        ),
                    ),
                    $('<tbody>'),
                ),
            ),
        );

        $('#pesquisa').val(pesquisa);

        retornoAjax = JSON.parse(retornoAjax);
        if (retornoAjax[1].length > 0) {
            $.each (retornoAjax[1], function(key, value) {
                $('tbody').append(
                    $('<tr>').append(
                        $('<td>').append(value.descricao),
                        $('<td>').append(value.placa),
                        $('<td>').append(value.marca),
                        $('<td>').append(
                            $('<a>', {href:'#'}).append(
                                $('<i>', {class:'fas fa-trash'}).on('click', function() {
                                    excluirCadastro(value.id);
                                }),
                            ).append(' '),
                            $('<a>', {href:'#'}).append(
                                $('<i>', {class:'fas fa-pen'}).on('click', function() {
                                    editarCadastro(value.id);
                                }),
                            ),
                        ),
                    ),
                );
            })
        } else {
            $('tbody').append(
                $('<tr>').append(
                    $('<td>', {colspan:'5', style:'text-align:center'}).append('Não há automóveis cadastrados!'),
                ),
            );
        }
    });
}

function pesquisarAutomoveis(pesquisa,pagina,callback) {
    $.ajax({
        type: 'POST',
        url:  'acoesAutomovel.php',
        data: {
            pagina: pagina,
            pesquisa: pesquisa,
        },
        success: function(data){
            callback(data);
        }
    });
}