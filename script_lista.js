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
                $('<br>'),
                $('<hr>'),
                $('<input>', {type:'hidden', class:'form-control', name:'atualizar', id:'atualizar', value:'false'}),
                $('<button>', {class:'btn btn-primary', type:'button', id:'buttoncomponentes'}).append('Cadastrar/Ver Componentes').on('click', function(){
                    editarComponente();
                }),
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
    $('#ano_modelo').mask('0000');
    $('#ano_fabricacao').mask('0000');

    listarComponentes().done(function(dados) {
        $.each (dados, function(key, value) {
            $('#buttoncomponentes').before(
                $('<div>', {class:'form-check form-check-inline'}).append(
                    $('<input>', {class:'form-check-input', type:'checkbox', id:value.id, name:value.id}),
                    $('<label>', {class:'form-check-label', for:'componente_'+value.id}).append(value.componentes),
                ),
            );
        })
    })
    
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
                    $('#id').val(value.id_automovel);
                    $('#descricao').val(value.descricao);
                    $('#placa').val(value.placa);
                    $('#renavan').val(value.renavan);
                    $('#ano_modelo').val(value.ano_modelo);
                    $('#ano_fabricacao').val(value.ano_fabricacao);
                    $('#cor').val(value.cor);
                    $('#km').val(value.km).mask('#.##0', {reverse: true});
                    $('#marca').val(value.marca);
                    $('#preco').val(value.preco).mask("#.##0,00", {reverse: true});
                    $('#preco_fipe').val(value.preco_fipe).mask("#.##0,00", {reverse: true});
                    $('#atualizar').val('true');
                    $.each(dados, function(key2, value2) {
                        if (value.id_componente == value2.id) {
                            $('#'+value.id_componente).attr('checked','checked');
                        }
                    })
                });
            }
        });
    }
}


function editarComponente(id) {

    $('.form').hide();
    $('.lista').hide();
    $('.pagination').hide();

    $('.formComponente').html('');
    $('.listaComponente').html('');

    $('.formComponente').append(
        $('<div>', {class:'container'}).append(
            $('<h1>', {style:'text-align:center'}).append('Dados dos Componentes'),
            $('<hr>'),
            $('<form>', {action:'acoesComponente.php', method:'POST', id:'formComponentes'}).append(
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-12'}).append(
                        $('<input>', {type:'hidden', class:'form-control', id:'idComponente', name:'idComponente'}),
                        $('<label>', {for:'componente'}).append('Componente'),
                        $('<input>', {type:'text', class:'form-control', id:'componente', name:'componente'})
                    ),
                ),
                $('<button>', {class:'btn btn-primary', type:'submit', style:'margin-right:10px', id:'salvar'}).append('Salvar'),
                $('<button>', {class:'btn btn-light', type:'button', onClick:'window.location.href = "home.php"'}).append('Voltar'),
            ),
        ),
    );

    if (typeof id != 'undefined') {
        $.ajax({
            type: 'POST',
            url:  'acoesComponente.php',
            data: {
                idEditar: id
            },
            success: function(data){
                data = JSON.parse(data);
                $.each (data, function(key, value) {
                    $('#idComponente').val(value.id);
                    $('#componente').val(value.componentes);
                });
            }
        });
    }
    
    listarComponentes().done(function(dados) {
        $('.listaComponente').append(
            $('<div>', {class:'container'}).append(
                $('<br>'),
                $('<table>', {class:'table table-hover'}).append(
                    $('<thead>').append(
                        $('<tr>').append(
                            $('<th>').append('Nome'),
                            $('<th>').append('Ações')
                        ),
                    ),
                    $('<tbody>'),
                ),
            ),
        );

        if (dados.length != 0) {
            $.each (dados, function(key, value) {
                $('tbody').append(
                    $('<tr>').append(
                        $('<td>').append(value.componentes),
                        $('<td>').append(
                            $('<a>', {href:'#'}).append(
                                $('<i>', {class:'fas fa-trash'}).on('click', function() {
                                    excluirComponente(value.id);
                                }),
                            ).append(' '),
                            $('<a>', {href:'#'}).append(
                                $('<i>', {class:'fas fa-pen'}).on('click', function() {
                                    editarComponente(value.id);
                                }),
                            ),
                        ),
                    ),
                );
            })
        } else {
            $('tbody').append(
                $('<tr>').append(
                    $('<td>', {colspan:'2', style:'text-align:center;'}).append('Não há componentes cadastrados'),
                ),
            );
        }
    });
}

function excluirComponente(id) {
    Swal.fire({
        title: 'Você quer realmente excluir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: "Não!"
    }).then((result) => {
        if (typeof result.value != 'undefined') {
            $.ajax({
                type: 'POST',
                url:  'acoesComponente.php',
                data: {
                    idExcluir: id
                },
                success: function(data){
                    Swal.fire({
                        title: 'Excluído com sucesso!',
                        icon: 'success',
                        showConfirmButton: true
                    }).then((result) => {
                        window.location.href = 'home.php';
                    })
                }
            });
        }
    });
}

function listarComponentes() {
    var objDeferred = $.Deferred();
    $.ajax({
        type: 'POST',
        url:  'acoesComponente.php',
        data: {
            listar: 'listar',
        },
        success: function(data){
            dados = JSON.parse(data);
            objDeferred.resolve(dados);
        }
    });
    return objDeferred.promise();
}

function excluirCadastro(id) {
    Swal.fire({
        title: 'Você quer realmente excluir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: "Não!"
    }).then((result) => {
        if (typeof result.value != 'undefined') {
            $.ajax({
                type: 'POST',
                url:  'acoesAutomovel.php',
                data: {
                    idExcluir: id
                },
                success: function(data){
                    Swal.fire({
                        title: 'Excluído com sucesso!',
                        icon: 'success',
                        showConfirmButton: true
                    }).then((result) => {
                        window.location.href = 'home.php';
                    })
                }
            });
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