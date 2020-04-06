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
            listar();
        },
        'listar/:pesquisa/:pagina/:coluna/:ordem': function(pesquisa, pagina, coluna, ordem) {
            listar(pesquisa, pagina, coluna, ordem);
        },
        'cadastro': function() {
            editarCadastro();
            popover();
            $('.chosen').chosen({width: '78.75%'});
        },
        'editar/:id': function(id) {
            editarCadastro(id);
            popover();
            $('.chosen').chosen({width: '78.75%'});
        },
        'componentes': function() {
            editarComponente();
        },
        'editarcomponente/:id': function(id) {
            editarComponente(id);
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

function editarCadastro(id) {

    $('.lista').html('');
    $('.pagination').html('');
    $('.listaComponente').html('');
    $('.formComponente').html('');
    $('.form').html('');
    
    $('.form').append(
        $('<div>', {class:'container'}).append(
            $('<h1>').append('Dados Cadastrais'),
            $('<hr>'),
            $('<form>', {action:'acoesAutomovel.php', method:'POST', id:'form'}).append(
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-4'}).append(
                        $('<input>', {type:'hidden', class:'form-control', id:'id', name:'id'}),
                        $('<label>', {for:'descricao', id:'popoverDescricao'}).append('Descrição'),
                        $('<input>', {type:'text', class:'form-control', id:'descricao', name:'descricao'})
                    ),
                    $('<div>', {class:'form-group col-md-4'}).append(
                        $('<label>', {for:'placa', id:'popoverPlaca'}).append('Placa'),
                        $('<input>', {type:'text', class:'form-control', id:'placa', name:'placa'})
                    ),
                    $('<div>', {class:'form-group col-md-4'}).append(
                        $('<label>', {for:'renavan', id:'popoverRenavan'}).append('Código RENAVAN'),
                        $('<input>', {type:'text', class:'form-control', id:'renavan', name:'renavan'})
                    ),
                ),
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'ano_modelo', id:'popoverAnoModelo'}).append('Ano do Modelo'),
                        $('<input>', {type:'text', class:'form-control', id:'ano_modelo', name:'ano_modelo'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'ano_fabricacao', id:'popoverAnoFabricacao'}).append('Ano de Fabricação'),
                        $('<input>', {type:'text', class:'form-control', id:'ano_fabricacao', name:'ano_fabricacao'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'cor', id:'popoverCor'}).append('Cor'),
                        $('<input>', {type:'text', class:'form-control', id:'cor', name:'cor'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'km', id:'popoverKM'}).append('KM'),
                        $('<input>', {type:'text', class:'form-control', id:'km', name:'km'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'marca', id:'popoverMarca'}).append('Marca'),
                        $('<input>', {type:'text', class:'form-control', id:'marca', name:'marca'})
                    ),
                ),
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'preco', id:'popoverPreco'}).append('Preço'),
                        $('<input>', {type:'text', class:'form-control', id:'preco', name:'preco'})
                    ),
                    $('<div>', {class:'form-group col-md-2'}).append(
                        $('<label>', {for:'preco_fipe', id:'popoverPrecoFipe'}).append('Preço Fipe'),
                        $('<input>', {type:'text', class:'form-control', id:'preco_fipe', name:'preco_fipe'})
                    ),
                ),
                $('<br>'),
                $('<h1>').append('Componenetes Adicionais'),
                $('<hr>'),
                $('<input>', {type:'hidden', class:'form-control', name:'atualizar', id:'atualizar', value:'false'}),
                $('<select>',{multiple:'true', class:'chosen', 'data-placeholder':'Escolhas os componentes...'}),
                $('<button>', {class:'btn btn-primary', type:'button', id:'buttoncomponentes', style:'margin-left: 5px;'}).append('Cadastrar/Ver Componentes').on('click', function(){
                    routie('componentes');
                }),
                $('<button>', {class:'btn btn-primary', type:'submit', style:'margin-right:10px', id:'salvar'}).append('Salvar').on('click', function() {
                    validar(event);
                }),
                $('<button>', {class:'btn btn-light', type:'button', onClick:'window.location.href = "home.php#listar"'}).append('Voltar'),
            ),
        ),
    );

    $('#placa').mask('AAA9999');
    $('#preco').mask('000.000.000,00', {reverse: true});
    $('#preco_fipe').mask('000.000.000,00', {reverse: true});
    $('#km').mask('000.000', {reverse: true});
    $('#ano_modelo').mask('0000');
    $('#ano_fabricacao').mask('0000');

    listarComponentes().done(function(dados) {
        $.each (dados, function(key, value) {
            $('.chosen').append(
                $('<option>').append(value.componentes)
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
				var automovel = data.automovel;
				$('#id').val(automovel.id);
				$('#descricao').val(automovel.descricao);
				$('#placa').val(automovel.placa);
				$('#renavan').val(automovel.renavan);
				$('#ano_modelo').val(automovel.ano_modelo);
				$('#ano_fabricacao').val(automovel.ano_fabricacao);
				$('#cor').val(automovel.cor);
				$('#km').val(automovel.km).mask('###.##0', {reverse: true});
				$('#marca').val(automovel.marca);
				var preco = automovel.preco.replace('.','');
				$('#preco').val(preco).mask("###.###.##0,00", {reverse: true});
				var preco_fipe = automovel.preco_fipe.replace('.','');
				$('#preco_fipe').val(preco_fipe).mask("###.###.##0,00", {reverse: true});
				$('#atualizar').val('true');
				$.each(data.componentes, function(key2, value2) {
					$('#'+value2.id).attr('checked','checked');
				})
            }
        });
    }

    $('.form').show();

}

function editarComponente(id) {

    $('.form').html('');
    $('.lista').html('');
    $('.pagination').html('');
    $('.formComponente').html('');
    $('.listaComponente').html('');

    $('.formComponente').append(
        $('<div>', {class:'container'}).append(
            $('<h1>').append('Dados dos Componentes'),
            $('<hr>'),
            $('<form>', {action:'acoesComponente.php', method:'POST', id:'formComponentes'}).append(
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'form-group col-md-12'}).append(
                        $('<input>', {type:'hidden', class:'form-control', id:'idComponente', name:'idComponente'}),
                        $('<label>', {for:'componente'}).append('Componente'),
                        $('<input>', {type:'text', class:'form-control', id:'componente', name:'componente'})
                    ),
                ),
                $('<button>', {class:'btn btn-primary', type:'submit', style:'margin-right:10px', id:'salvar'}).append('Salvar').on('click', function() {
                    validarComponente(event);
                }),
                $('<button>', {class:'btn btn-light', type:'button', onClick:'window.location.href = "home.php#listar"'}).append('Voltar'),
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
                $('<table>', {class:'table table-striped'}).append(
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
                                    routie('editarcomponente/'+value.id);
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

    $('.formComponente').show();
    $('.listaComponente').show();

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
        if (result.value) {
            $.ajax({
                type: 'POST',
                url:  'acoesComponente.php',
                data: {
                    idExcluir: id
                },
                success: function(data){
                    if (data == 1) {
                        Swal.fire({
                            title: 'Excluído com sucesso!',
                            icon: 'success',
                            showConfirmButton: true
                        }).then((result) => {
                            window.location.href = 'home.php#componentes';
                        })
                    } else {
                        Swal.fire({
                            title: 'Componente não pode ser excluído!',
                            text: 'Componente está linkado com algum automóvel',
                            icon: 'error',
                            showConfirmButton: true
                        }).then((result) => {
                            window.location.href = 'home.php#componentes';
                        })
                    }
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
        if (result.value) {
            $.ajax({
                type: 'POST',
                url:  'acoesAutomovel.php',
                data: {
                    idExcluir: id
                },
                success: function(data){
                    if (data == 1) {
                        Swal.fire({
                            title: 'Excluído com sucesso!',
                            icon: 'success',
                            showConfirmButton: true
                        }).then((result) => {
                            window.location.href = 'home.php#listar';
                        })
                    } else {
                        Swal.fire({
                            title: 'Automóvel não pode ser excluído!',
                            text: 'Automóvel está linkado com algum componente',
                            icon: 'error',
                            showConfirmButton: true
                        }).then((result) => {
                            window.location.href = 'home.php#listar';
                        })
                    }
                }
            });
        }
    });
}
                

function paginacao(retornoAjax, coluna, ordem){

    retornoAjax = JSON.parse(retornoAjax);
    var dados = retornoAjax[0]['automoveis'];
    var limite = 5;
    var paginas = Math.ceil(dados/limite);

    $('.pagination').html('');

    for (var i = 0; i < paginas; i++) {
        $('.pagination').append(
            $('<li>', {class:'page-item'}).append(
                $('<a>', {class:'page-link'}).on('click', function(){
                    var busca = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                    routie('listar/' + busca + '/' + $(this).text() + '/' + coluna + '/' + ordem);
                }).append(i+1),
                $('<input>', {type:'hidden', name:'pagina', id:'pagina', value:i+1}),
            ),
        )
    }

}

function listar(pesquisa, pagina, coluna = 'descricao', ordem = 'ASC') {

    var busca = pesquisa == 'NULL' ? '' : pesquisa;

    $('.formComponente').html('');
    $('.listaComponente').html('');
    $('.lista').html('');
    $('.form').html('');
    
    pesquisarAutomoveis(busca, parseInt(pagina)-1, coluna, ordem, function(retornoAjax) {
        paginacao(retornoAjax, coluna, ordem);
        $('.lista').append(
            $('<div>', {class:'container'}).append(
                $('<h1>').append('Lista de Automóveis'),
                $('<hr>'),
                $('<div>', {class:'form-group col-md-12 input'}).append(
                    $('<input>', {type:'text', class:'form-control', id:'pesquisa', name:'pesquisa', placeholder:'Pesquise aqui por descrição ou marca'}).on('keyup', function() {
                        pesquisarAutomoveis($('#pesquisa').val(), 0, coluna, ordem, function(retornoAjax) {
                            $('tbody').html('');
                            $('.ordenacao').show();
                            paginacao(retornoAjax, coluna, ordem);
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
                                                        routie('editar/'+value.id);
                                                    }),
                                                ),
                                            ),
                                        ),
                                    );
                                })
                            } else {
                                $('.ordenacao').hide();
                                $('tbody').append(
                                    $('<tr>').append(
                                        $('<td>', {colspan:'5', style:'text-align:center'}).append('Não foi encontrado nenhum automóvel!')
                                    ),
                                );
                            }
                        });
                    })
                ),

                $('<table>', {class:'table table-striped'}).append(
                    $('<thead>').append(
                        $('<tr>').append(
                            $('<th>').append(
                                $('<div>', {style:'width: 27.5%;'}).append('Descrição').append(
                                    $('<div>', {class:'ordenacao'}).append(
                                        $('<a>', {href:'#', style:'height: 4px;'}).append(
                                            $('<i>', {class:'fas fa-sort-up'}).on('click', function() {
                                                buscaOrdenacao = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                                                routie('listar/'+ buscaOrdenacao + '/' + $('#pagina').val() + '/descricao/ASC');
                                            }),
                                        ),
                                        $('<a>', {href:'#'}).append(
                                            $('<i>', {class:'fas fa-sort-down'}).on('click', function() {
                                                buscaOrdenacao = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                                                routie('listar/'+ buscaOrdenacao + '/' + $('#pagina').val() + '/descricao/DESC');
                                            }),
                                        ),
                                    ),
                                ),
                            ),
                            $('<th>').append(
                                $('<div>', {style:'width: 23.5%;'}).append('Placa').append(
                                    $('<div>', {class:'ordenacao'}).append(
                                        $('<a>', {href:'#', style:'height: 4px;'}).append(
                                            $('<i>', {class:'fas fa-sort-up'}).on('click', function() {
                                                buscaOrdenacao = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                                                routie('listar/'+ buscaOrdenacao + '/' + $('#pagina').val() + '/placa/ASC');
                                            }),
                                        ),
                                        $('<a>', {href:'#'}).append(
                                            $('<i>', {class:'fas fa-sort-down'}).on('click', function() {
                                                buscaOrdenacao = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                                                routie('listar/'+ buscaOrdenacao + '/' + $('#pagina').val() + '/placa/DESC');
                                            }),
                                        ),
                                    ),
                                ),
                            ),
                            $('<th>').append(
                                $('<div>', {style:'width: 26.5%;'}).append('Marca').append(
                                    $('<div>', {class:'ordenacao'}).append(
                                        $('<a>', {href:'#', style:'height: 4px;'}).append(
                                            $('<i>', {class:'fas fa-sort-up'}).on('click', function() {
                                                buscaOrdenacao = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                                                routie('listar/'+ buscaOrdenacao + '/' + $('#pagina').val() + '/marca/ASC');
                                            }),
                                        ),
                                        $('<a>', {href:'#'}).append(
                                            $('<i>', {class:'fas fa-sort-down'}).on('click', function() {
                                                buscaOrdenacao = $('#pesquisa').val() == '' ? 'NULL' : $('#pesquisa').val();
                                                routie('listar/'+ buscaOrdenacao + '/' + $('#pagina').val() + '/marca/DESC');
                                            }),
                                        ),
                                    ),
                                ),
                            ),
                            $('<th>').append('Ações')
                        ),
                    ),
                    $('<tbody>'),
                ),
            ),
        );

        $('#pesquisa').val(busca);

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
                                    routie('editar/'+value.id);
                                }),
                            ),
                        ),
                    ),
                );
            })
        } else {
            $('.ordenacao').hide();
            $('tbody').append(
                $('<tr>').append(
                    $('<td>', {colspan:'5', style:'text-align:center'}).append('Não há automóveis cadastrados!'),
                ),
            );
        }
    });

    $('.lista').show();
    $('.pagination').show();

}

function pesquisarAutomoveis(pesquisa, pagina, coluna = 'descricao', ordem = 'ASC', callback) {
    $.ajax({
        type: 'POST',
        url:  'acoesAutomovel.php',
        data: {
            pagina: pagina,
            pesquisa: pesquisa,
            coluna: coluna,
            ordem: ordem
        },
        success: function(data){
            callback(data);
        }
    });
}