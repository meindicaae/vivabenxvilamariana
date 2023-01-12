// bootstrap poppovers
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

// modal
$('.modal').modal(
    {
        backdrop: 'static',
        keyboard: false,
        show: false
    }
);

// google form sheet
function handleSubmit(event) {

    event.preventDefault();

    // dados morador
    var nomemoradorinput = document.querySelector('input[name=nomemorador]').value;
    var celularmoradorinput = document.querySelector('input[name=celularmorador]').value;
    var aptomoradorinput = document.querySelector('input[name=aptomorador]').value;
    
    // dados profissional
    var nomeprofissionalinput = document.querySelector('input[name=nomeprofissional]').value;
    var categoriaprofissionalinput = document.querySelectorAll('option:checked');
    var celularprofissionalinput = document.querySelector('input[name=celularprofissional]').value;
    var emailprofissionalinput = document.querySelector('input[name=emailprofissional]').value;
    var siteprofissionalinput = document.querySelector('input[name=siteprofissional]').value;
    var indicandoprofissionalinput = document.querySelector('textarea[name=indicandoprofissional]').value;

    fetch('https://api.sheetmonkey.io/form/eq6HsrSoaM9oFxP9531Lae', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nomemorador: nomemoradorinput,
                celularmorador: celularmoradorinput,
                aptomorador: aptomoradorinput,

                nomeprofissional: nomeprofissionalinput,
                categoriaprofissional: categoriaprofissionalinput,
                celularprofissional: celularprofissionalinput,
                emailprofissional: emailprofissionalinput,
                siteprofissional: siteprofissionalinput,
                indicandoprofissional: indicandoprofissionalinput,
            }
        )
    });
} // document.querySelector('form').addEventListener('submit', handleSubmit);


// get json profissionais
var getProfissionaisJSON = {
    init: function() {
        this.listAll();
        this.engine();
    },
    listAll: function() {

        var el = $('#listaprofissionais');
        
        $.ajax({
            type: "GET",
            url: "https://opensheet.elk.sh/1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po/Profissionais",
            success: function(result) {
                
                // console.log(result);
                var output = '';

                result.reverse();

                for (var i in result) {                            
                    output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                    output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                    output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                    output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+result[i].celularprofissional+'&text=Olá, '+result[i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result[i].celularprofissional +'</a></p>';

                    if(result[i].emailprofissional != '') {
                        output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result[i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                    }
                    
                    if(result[i].siteprofissional != '') {
                        output += '<p class="siteprofissional"><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank"> Acessar o site </a></p>';
                    }
                    
                    output += '<hr>';
                    output += '<p class="quemindicou"><small><strong>Por: </strong><em>'+ result[i].nomemorador +'</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                    output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result[i].indicandoprofissional + '</p>';
                    output += '</div>';
                }

                el.html(output);
            }
        });

    },
    engine: function() {
        
        var el = $('#listaprofissionais');
        var filter = $('#categoriaprofissional');

        $.ajax({
            type: "GET",
            url: "https://opensheet.elk.sh/1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po/Profissionais",
            success: function(result) {
                
                var output;

                result.reverse();

                filter.on(
                    'change',
                    function() {
                        
                        var filterSelected = $(this).val();
                        // console.log(filterSelected);
                        
                        output = '';
                        
                        for (var i in result) {
                            
                            if(result[i].categoriaprofissional == filterSelected) {
                                output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                                output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                                output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                                output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+result[i].celularprofissional+'&text=Olá, '+result[i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result[i].celularprofissional +'</a></p>';
                                
                                if(result[i].emailprofissional != '') {
                                    output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result[i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                                }
                                
                                if(result[i].siteprofissional != '') {
                                    output += '<p class="siteprofissional"><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank">Acessar o site</a></p>';
                                }

                                output += '<hr>';
                                output += '<p class="quemindicou"><small><strong>Por: </strong><em>'+ result[i].nomemorador +'</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result[i].indicandoprofissional + '</p>';
                                output += '</div>';
                                
                            } else if(filterSelected == 'todos') {

                                output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                                output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                                output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                                output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+result[i].celularprofissional+'&text=Olá, '+result[i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result[i].celularprofissional +'</a></p>';
                                output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result[i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                                output += '<p><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank">Acessar o site</a></p>';
                                output += '<hr>';
                                output += '<p class="quemindicou"><small><strong>Por: </strong><em>'+ result[i].nomemorador +'</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result[i].indicandoprofissional + '</p>';
                                output += '</div>';
                            }
                        }
        
                        el.html(output);

                    }
                )
            }
        });
    }
}
getProfissionaisJSON.init();
