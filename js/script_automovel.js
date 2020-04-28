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
            $('<form>', {id:'form'}).append(
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
                $('<button>', {class:'btn btn-primary', type:'button', id:'buttonComponentes'}).append('Cadastrar Componente').on('click', function(){
                    dialogComponente();
                }),
                $('<button>', {class:'btn btn-primary', type:'button', style:'margin-right:10px', id:'salvar'}).append('Salvar').on('click', function() {
                    if (validar(event)) {
                        enviarForm();
                    }
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
                $('<option>', {id:value.id, value:value.id}).append(value.componentes)
            );
        })
        $('.chosen').chosen({width: '100%'});
    })
    
    $('#salvar').before('<br>');

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
					$('#'+value2.id).attr('selected', 'selected');
                })
                $('select').trigger('chosen:updated');
            }
        });
    }

    $('.form').show();

}

function enviarForm() {

    var arrayAutomovel = $('#form').serializeArray();
    var arrayComponentes = $(".chosen").chosen().val();

    $.ajax({
        type: 'POST',
        url:  'acoesAutomovel.php',
        data: {
            automovel: arrayAutomovel,
            componentes: arrayComponentes
        },
        success: function(data){
            window.location.href = 'home.php#listar';
        }
    });

}


function apagarAutomoveisSelecionados() {

    var automoveisSelecionados = $('#apagarAutomoveisSelecionados').serializeArray();

    $.ajax({
        type: 'POST',
        url:  'acoesAutomovel.php',
        data: {
            automoveisSelecionados: automoveisSelecionados
        },
        success: function(data){
            data = JSON.parse(data);
            var k = 0;
            var countData = 0;
            $.each (automoveisSelecionados, function(key, value) {
                if (value.name == 'selecionarTodos') {
                    countData = -1;
                }
            })
            $.each (data, function(key, value) {
                countData++;
                if (value.linhaAfetada == 1) {
                    k++;
                }
            })
            if (k == countData) {
                swalFire('Automóveis excluídos com sucesso!', 'Todos os automóveis selecionados foram excluídos', 's', listar());
            } else if (k > 0 && k < countData) {
                Swal.fire({
                    title: 'Automóveis excluídos com sucesso!',
                    text: 'Alguns automóveis selecionados foram excluídos',
                    icon: 'success',
                    showConfirmButton: true
                }).then((result) => {
                    swalFire('Algum automóvel não pôde ser excluído!', 'Esse automóvel está linkado com algum componente', 'e', listar());
                })
            } else {
                swalFire('Nenhum automóvel pôde ser excluído!', 'Esses automóveis estão linkados com algum componente', 'e', listar());
            }
        }
    });

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
                        swalFire('Excluído com sucesso!', '', 's', window.location.href = 'home.php#listar');
                    } else {
                        swalFire('Automóvel não pode ser excluído!', 'Automóvel está linkado com algum componente', 'e', window.location.href = 'home.php#listar');
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

function tabelaAutomoveis(retornoAjax, checked) {

    var selecionado = checked != '' ? true : false;

    $.each (retornoAjax[1], function(key, value) {
        $('tbody').append(
            $('<tr>').append(
                $('<td>').append(
                    $('<input>', {type:'checkbox', id:'automovelSelecionado', name:'automovelSelecionado', value:value.id, style:'margin-top: 5px;', checked:selecionado}).on('click', function() {
                        var checkbox = document.querySelectorAll('#automovelSelecionado');
                        var k = 0;
                        $.each (checkbox, function(key, value) {
                            if (value.checked) {
                                k++;
                            }
                        });
                        if (k > 0) {
                            $('#apagarAutomoveis').remove();
                            $('table').before(
                                $('<button>', {class:'btn btn-primary', type:'button', style:'margin-bottom:15px', id:'apagarAutomoveis'}).append('Apagar Selecionado(s)').on('click', function() {
                                    apagarAutomoveisSelecionados();
                                }),
                            );
                        } else {
                            $('#apagarAutomoveis').remove();
                        }
                    }),
                ),
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

}

function listar(pesquisa, pagina, coluna = 'descricao', ordem = 'ASC') {

    if ($('.formComponente').hasClass('ui-dialog-content')) {
        $('.formComponente').dialog('destroy');
    }

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
                                tabelaAutomoveis(retornoAjax, '');
                                $('.checkboxTabela').show();
                            } else {
                                $('.ordenacao').hide();
                                $('.checkboxTabela').hide();
                                $('tbody').append(
                                    $('<tr>').append(
                                        $('<td>', {colspan:'5', style:'text-align:center'}).append('Não foi encontrado nenhum automóvel!')
                                    ),
                                );
                            }
                        });
                    })
                ),
                
                $('<br>'),
                $('<form>', {id:'apagarAutomoveisSelecionados'}).append(
                    $('<table>', {class:'table table-striped'}).append(
                        $('<thead>').append(
                            $('<tr>').append(
                                $('<th>', {class:'checkboxTabela', style:'width:5%;'}).append(
                                    $('<input>', {type:'checkbox', id:'selecionarTodos', name:'selecionarTodos', style:'margin-top: 5px;'}).on('click', function() {
                                        var checkbox = document.getElementById('selecionarTodos');
                                        if (checkbox.checked) {
                                            $('tbody').html('');
                                            $('#apagarAutomoveis').remove();
                                            $('table').before(
                                                $('<button>', {class:'btn btn-primary', type:'button', style:'margin-bottom:15px', id:'apagarAutomoveis'}).append('Apagar Selecionado(s)').on('click', function() {
                                                    apagarAutomoveisSelecionados();
                                                }),
                                            );
                                            tabelaAutomoveis(retornoAjax, 'checked');
                                        } else {
                                            $('tbody').html('');
                                            $('#apagarAutomoveis').remove();
                                            tabelaAutomoveis(retornoAjax, '');
                                        }
                                    }),
                                ),
                                $('<th>').append(
                                    $('<div>', {style:'width: 33%;'}).append('Descrição').append(
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
                                    $('<div>', {style:'width: 30%;'}).append('Placa').append(
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
                                    $('<div>', {style:'width: 33%;'}).append('Marca').append(
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
            ),
        );

        $('#pesquisa').val(busca);

        retornoAjax = JSON.parse(retornoAjax);
        if (retornoAjax[1].length > 0) {
            tabelaAutomoveis(retornoAjax, '');
        } else {
            $('.checkboxTabela').remove();
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