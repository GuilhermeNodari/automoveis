<?php include_once 'header.include.php'?>

<div id="carousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carousel" data-slide-to="0" class="active"></li>
        <li data-target="#carousel" data-slide-to="1"></li>
        <li data-target="#carousel" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="first-slide imagemCarousel" src="css/carro3.jpg">
            <div class="container">
                <div class="carousel-caption">
                <h1>Bem Vindo ao sistema de Cadastro de Automóveis!</h1><br>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <img class="second-slide imagemCarousel" src="css/carro2.jpg">
            <div class="container">
                <div class="carousel-caption">
                <h1>Nele você poderá, além de cadastrar automóveis, cadastrar seus componentes...</h1><br>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <img class="third-slide imagemCarousel" src="css/carro1.jpg">
            <div class="container">
                <div class="carousel-caption">
                <h1>Cadastre um automóvel e teste o sistema!</h1>
                <p><a class="button" href="home.php#cadastro" role="button">Clique Aqui</a></p><br>
                </div>
            </div>
        </div>
    </div>
    <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </a>
    <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </a>
</div>

<div class="lista"></div>
<div class="form"></div>
<div class="formComponente"></div>
<div class="listaComponente"></div>
<div class="paginacao"></div>

</body>
</html>