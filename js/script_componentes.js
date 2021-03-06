var idSelecionadosPagina = [];

function listarComponentes(pagina) {

    var objDeferred = $.Deferred();

    $.ajax({
        type: 'POST',
        url:  'acoesComponente.php',
        data: {
            funcao: 'listar',
            pagina: pagina
        },
        success: function(data){
            var dados = JSON.parse(data);
            objDeferred.resolve(dados);
        }
    });

    return objDeferred.promise();
}

function paginacaoComponentes(componentes){

    var dados = componentes.length;
    var limite = 5;
    var paginas = Math.ceil(dados/limite);

    $('.paginacao').html('');
    $('.paginacao').append(
        $('<nav>', {'aria-label':'Paginação'}).append(
            $('<ul>', {class:'pagination justify-content-center', id:'paginacao'}),
        ),
    );

    for (var i = 0; i < paginas; i++) {
        $('ul#paginacao').append(
            $('<li>', {class:'page-item'}).append(
                $('<a>', {class:'page-link', id:i+1}).on('click', function(){
                    routie('componentes/' + $(this).text());
                }).append(i+1),
                $('<input>', {type:'hidden', name:'pagina', id:'pagina', value:i+1}),
            ),
        )
    }

    var checkboxes = document.querySelectorAll('#componenteSelecionado');
    var selecionarTodos = document.getElementById('selecionarTodos');

    $('#selecionarTodos').click(function() {
        if (selecionarTodos.checked) {
            idSelecionadosPagina.push(selecionarTodos.name);
            $.each (checkboxes, function(key, value) {
                idSelecionadosPagina.push(value.value);
            });
        } else {
            idSelecionadosPagina.splice(idSelecionadosPagina.indexOf(selecionarTodos.name), 1);
            $.each (checkboxes, function(key, value) {
                idSelecionadosPagina.splice(idSelecionadosPagina.indexOf(value.value), 1);
            });
        }
    });

    $('#componenteSelecionado').click(function() {
        $.each (checkboxes, function(key, value) {
            if (value.checked) {
                idSelecionadosPagina.push(value.value);
            } else {
                idSelecionadosPagina.splice(idSelecionadosPagina.indexOf(value.value), 1);
            }
        });
    });

}

function botaoApagarTodosComponentes() {
    $('#apagarComponentes').remove();
    $('table').before(
        $('<a>', {href:'#', class:'button', id:'apagarComponentes', style:'margin-bottom: 10px;'}).append('Apagar Selecionado(s)').on('click', function() {
            apagarComponentesSelecionados();
        }),
    );
}

function editarComponente(id, componente, pagina) {

    if ($('.formComponente').hasClass('ui-dialog-content')) {
        $('.formComponente').dialog('destroy');
    }

    $('.form').html('');
    $('.lista').html('');
    $('.formComponente').html('');
    $('.listaComponente').html('');
    $('.breadcrumbPrincipal').remove();

    $('.lista').before(
        $('<nav>', {'aria-label':'breadcrumb', class:'breadcrumbPrincipal'}).append(
            $('<ol>', {class:'breadcrumb'}).append(
                $('<li>', {class:'breadcrumb-item'}).append(
                    $('<a>', {href:'home.php'}).append('Home'),
                ),
                $('<li>', {class:'breadcrumb-item active', 'aria-curent':'page'}).append('Componentes'),
            ),
        ),
    );

    $('.formComponente').append(
        $('<div>', {class:'container'}).append(
            $('<h4>').append('Dados dos Componentes'),
            $('<hr>'),
            $('<form>', {id:'formComponentes'}).append(
                $('<input>', {type:'hidden', class:'form-control', id:'idComponente', name:'idComponente'}),
                $('<input>', {type:'hidden', class:'form-control', id:'dialog', name:'dialog', value:''}),
                $('<div>', {class:'md-12'}).append(
                    $('<input>', {type:'text', class:'form-control', id:'componente', name:'componente', placeholder:'Componente'})
                ),
                $('<br>'),
                $('<a>', {href:'#', class:'button', id:'salvarComponentes'}).append('Salvar').on('click', function() {
                    if (validarComponente(event)) {
                        enviarFormComponente();
                    }
                }),
                $('<a>', {href:'home.php#listar', class:'button'}).append('Voltar'),
            ),
        ),
    );

    $('#componente').val(componente);
    
    if (typeof id != 'undefined') {
        $.ajax({
            type: 'POST',
            url:  'acoesComponente.php',
            data: {
                funcao: 'editar',
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

    function tabelaComponentes(checked) {

        if (idSelecionadosPagina.length > 0) {
            botaoApagarTodosComponentes();
        }

        listarComponentes(pagina-1).done(function(dados) {
            $.each (dados[1], function(key, value) {
                $('tbody').append(
                    $('<tr>').append(
                        $('<td>').append(
                            $('<input>', {type:'checkbox', id:'componenteSelecionado', name:'componenteSelecionado', value:value.id, style:'margin-top: 5px;', checked:checked}).on('click', function() {
                                var checkbox = document.querySelectorAll('#componenteSelecionado');
                                var k = 0;
                                $.each (checkbox, function(key, value) {
                                    if (value.checked) {
                                        k++;
                                    }
                                });
                                if (k > 0) {
                                    $('#apagarComponentes').remove();
                                    $('table').before(
                                        $('<a>', {href:'#', class:'button', id:'apagarComponentes', style:'margin-bottom: 10px;'}).append('Apagar Selecionado(s)').on('click', function() {
                                            apagarComponentesSelecionados();
                                        }),
                                    );
                                } else {
                                    $('#apagarComponentes').remove();
                                }
                            }),
                        ),
                        $('<td>').append(value.componentes),
                        $('<td>').append(
                            $('<div>', {style: 'text-align: center;'}).append(
                                $('<a>', {href:'#'}).append(
                                    $('<i>', {class:'fas fa-trash', style:'color: red;'}).on('click', function() {
                                        excluirComponente(value.id);
                                    }),
                                ).append(' '),
                                $('<a>', {href:'#'}).append(
                                    $('<i>', {class:'fas fa-pen', style:'color: #696969;'}).on('click', function() {
                                        routie('editarComponente/'+value.id);
                                    }),
                                ),
                            ),
                        ),
                    ),
                );
            });

            paginacaoComponentes(dados[0]);
            $('a#'+pagina).attr('style', 'background-color: #e8e8e8; border: 1px solid #696969;');

            $.each (idSelecionadosPagina, function(key, value) {
                if (value == 'selecionarTodos') {
                    $('#selecionarTodos').attr('checked', true);
                }
                $('input:checkbox[value="'+ value +'"]').attr('checked', true);
            });
        
            $('#selecionarTodos').attr('checked', false);

        });

    }
    
    listarComponentes(pagina-1).done(function(dados) {
        $('.listaComponente').append(
            $('<div>', {class:'container'}).append(
                $('<form>', {id:'apagarComponentesSelecionados'}).append(
                    $('<table>', {class:'table table-striped'}).append(
                        $('<thead>').append(
                            $('<tr>').append(
                                $('<th>', {class:'checkboxTabela', style:'width: 10px;'}).append(
                                    $('<input>', {type:'checkbox', id:'selecionarTodos', name:'selecionarTodos', style:'margin-top: 5px;'}).on('click', function() {
                                        var checkbox = document.getElementById('selecionarTodos');
                                        if (checkbox.checked) {
                                            $('tbody').html('');
                                            botaoApagarTodosComponentes();
                                            tabelaComponentes(true);
                                        } else {
                                            $('#apagarComponentes').remove();
                                            var checkbox = document.querySelectorAll('#componenteSelecionado');
                                            $.each (checkbox, function(key, value) {
                                                value.checked = false;
                                            });
                                        }
                                    }),
                                ),
                                $('<th>').append('Nome'),
                                $('<th>', {style: 'width: 150px;'}),
                            ),
                        ),
                        $('<tbody>'),
                    ),
                ),
            ),
        );

        if (dados[0].length != 0) {
            tabelaComponentes(false);
        } else {
            $('.checkboxTabela').remove();
            $('.paginacao').html('');
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

function dialogComponente() {

    $('.formComponente').html('');

    $('.formComponente').append(
        $('<div>', {class:'container'}).append(
            $('<form>', {id:'formComponentes'}).append(
                $('<div>', {class:'form-row'}).append(
                    $('<div>', {class:'col-12'}).append(
                        $('<input>', {type:'hidden', class:'form-control', id:'idComponente', name:'idComponente'}),
                        $('<input>', {type:'hidden', class:'form-control', id:'dialog', name:'dialog', value:'dialog'}),
                        $('<input>', {type:'text', class:'form-control', id:'componente', name:'componente', placeholder:'Componente'}),
                    ),
                ),
                $('<a>', {href:'#', class:'button', id:'salvarComponentes', style:'margin-top: 10px;'}).append('Salvar').on('click', function() {
                    if (validarComponente(event)) {
                        enviarFormComponente();
                    }
                }),
            ),
        ),
    );

    $('.formComponente').dialog({
        height: 165,
        width: 500
    });

}

function enviarFormComponente() {

    var arrayComponentes = $('#formComponentes').serializeArray();

    $.ajax({
        type: 'POST',
        url:  'acoesComponente.php',
        data: {
            funcao: 'cadastrar',
            componentes: arrayComponentes
        },
        success: function(data){
            idSelecionadosPagina = [];
            data = JSON.parse(data);
            var componentesSelecionados = $(".chosen").chosen().val();
            if (data.dialog) {
                var id = data.id;
                $('.chosen').html('');
                listarComponentes('').done(function(dados) {
                    $.each (dados[0], function(key, value) {
                        $('.chosen').append(
                            $('<option>', {id:value.id, value:value.id}).append(value.componentes)
                        );
                    })
                    $('.chosen').chosen({width: '100%'});
                    $.each (componentesSelecionados, function(key, value) {
                        $('#'+value).attr('selected', 'selected');
                    })
                    $('#'+id).attr('selected', 'selected');
                    $('select').trigger('chosen:updated');
                })
                $('.formComponente').dialog('destroy');
                $('.formComponente').html('');
            } else {
                editarComponente();
            }
        }
    });

}

function apagarComponentesSelecionados() {

    $.ajax({
        type: 'POST',
        url:  'acoesComponente.php',
        data: {
            funcao: 'excluirSelecionados',
            componentesSelecionados: idSelecionadosPagina
        },
        success: function(data){
            data = JSON.parse(data);
            var k = 0;
            var countData = 0;
            $.each (idSelecionadosPagina, function(key, value) {
                if (value == 'selecionarTodos') {
                    countData = -1;
                }
            })
            $.each (data, function(key, value) {
                countData++;
                if (value.linhaAfetada == 1) {
                    k++;
                }
            })
            $('#apagarComponentes').remove();
            if (k == countData) {
                swalFire('Componente(s) excluído(s) com sucesso!', 'Todos os componentes selecionados foram excluídos', 's', editarComponente('', $('#componente').val()));
            } else if (k > 0 && k < countData) {
                Swal.fire({
                    title: 'Componente(s) excluído(s) com sucesso!',
                    text: 'Alguns componentes selecionados foram excluídos',
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonColor: '#a9a9a9'
                }).then((result) => {
                    swalFire('Algum componente não pôde ser excluído!', 'Esse componente está linkado com algum automóvel', 'e', editarComponente('', $('#componente').val()));
                })
            } else {
                swalFire('Nenhum componente pôde ser excluído!', 'Esses componentes estão linkados com algum automóvel', 'e', editarComponente('', $('#componente').val()));
            }
        }
    });

}

function excluirComponente(id) {
    Swal.fire({
        title: 'Você quer realmente excluir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#008000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: "Não!"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'POST',
                url:  'acoesComponente.php',
                data: {
                    funcao: 'excluir',
                    idExcluir: id
                },
                success: function(data){
                    $('#apagarComponentes').remove();
                    if (data == 1) {
                        swalFire('Excluído com sucesso!', '', 's', editarComponente('', $('#componente').val()));
                    } else {
                        swalFire('Componente não pode ser excluído!', 'Componente está linkado com algum automóvel', 'e', editarComponente('', $('#componente').val()));
                    }
                }
            });
        }
    });
}
