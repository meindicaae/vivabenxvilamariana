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
    }).finally(
        window.location.href = ("http://www.w3schools.com")
    );
}
// document.querySelector('form').addEventListener('submit', handleSubmit);


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

                for (var i in result) {                            
                    output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                    output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                    output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                    output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="#">'+ result[i].celularprofissional +'</a></p>';
                    output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:">'+ result[i].emailprofissional +'</a></p>';
                    output += '<p><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank">'+ result[i].siteprofissional +'</a></p>';
                    output += '<hr>';
                    output += '<p class="quemindicou"><strong>Por: </strong><em>'+ result[i].nomemorador +'</em></p>';
                    output += '<p class="comentario">'+ result[i].indicandoprofissional +'</p>';
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
                
                // console.log(result);
                var output;

                filter.on(
                    'change',
                    function() {
                        
                        var filterSelected = $(this).val();
                        console.log(filterSelected);
                        
                        output = '';
                        
                        for (var i in result) {
                            
                            if(result[i].categoriaprofissional == filterSelected) {
                                output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                                output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                                output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                                output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="#">'+ result[i].celularprofissional +'</a></p>';
                                output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:">'+ result[i].emailprofissional +'</a></p>';
                                output += '<p><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank">'+ result[i].siteprofissional +'</a></p>';
                                output += '<hr>';
                                output += '<p class="quemindicou"><strong>Por: </strong><em>'+ result[i].nomemorador +'</em></p>';
                                output += '<p class="comentario">'+ result[i].indicandoprofissional +'</p>';
                                output += '</div>';
                                
                            } else if(filterSelected == 'todos') {

                                output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                                output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                                output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                                output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="#">'+ result[i].celularprofissional +'</a></p>';
                                output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:">'+ result[i].emailprofissional +'</a></p>';
                                output += '<p><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank">'+ result[i].siteprofissional +'</a></p>';
                                output += '<hr>';
                                output += '<p class="quemindicou"><strong>Por: </strong><em>'+ result[i].nomemorador +'</em></p>';
                                output += '<p class="comentario">'+ result[i].indicandoprofissional +'</p>';
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
