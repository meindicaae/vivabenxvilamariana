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

// autocomplete
var condominio = ['Viva Benx Cambuci I','Viva Benx Cambuci II','Viva Benx Vila Leopoldina I','Viva Benx Vila Leopoldina II','Viva Benx Vila Mariana','Viva Benx Vila Mascote','Viva Benx Mooca','Viva Benx Vila Olímpia'];
function matchCondominio(input) {
	var reg = new RegExp(input.split("").join("\\w*").replace(/\W/, ""), "i");
	var res = [];
	if (input.trim().length === 0) {
		return res;
	}
	for (var i = 0, len = condominio.length; i < len; i++) {
		if (condominio[i].match(reg)) {
		res.push(condominio[i]);
		}
	}
	return res;
};

function changeInput(val) {
	var autoCompleteresult = matchCondominio(val);
	document.getElementById("result['rows']adoNomeCondominio").innerHTML = "";
	for (var i = 0, limit = 10, len = autoCompleteresult['rows'].length; i < len  && i < limit; i++) {
		document.getElementById("result['rows']adoNomeCondominio").innerHTML += "<a href='javascript:void(0)' onclick='setSearch(\"" + autoCompleteresult['rows'][i] + "\")'>" + autoCompleteresult['rows'][i] + "</a>";
	}
};

function setSearch(value) {
    document.getElementById('nomecondominio').value = value;
	document.getElementById("result['rows']adoNomeCondominio").innerHTML = "";
    var nomeCondominio = value;
    var expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth() + 1);
    document.cookie = 'nomecondominio='+ nomeCondominio +'; expires='+ expireDate.toGMTString();
    location.href = "/tunel.html";
};

function setVLM(el) {
    var nomeCondominio = el;
    var expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth() + 1);
    document.cookie = 'nomecondominio='+ nomeCondominio +'; expires='+ expireDate.toGMTString();
    location.href = "/tunel.html";
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

function tempCondominio() {
    document.getElementById("result['rows']adoNomeCondominio").innerHTML += "<a href='javascript:void(0)' onclick='setSearch(\"" + autoCompleteresult['rows'][i] + "\")'>" + autoCompleteresult['rows'][i] + "</a>";
}

function checkCookie() {
    var nomeCondominio = getCookie("nomecondominio");
    var path = window.location.pathname;
    var page = path.split("/").pop();
    // console.log(page);
    
    if (nomeCondominio != "" && (page == 'index.html' || page == '')) {
        // console.log('redireciona pra página tunel. Cookie ativado');
        window.location.replace("/tunel.html");

    } else if(nomeCondominio == "" && page != 'index.html') {
        window.location.replace("/index.html");

    }
};

function removeCookie() {
    document.cookie = "nomecondominio = ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.replace("/");
}

// get json profissionais
var getProfissionaisJSON = {
    init: function() {
        this.listAll();
        this.engine();
        this.blacklist();
    },
    listAll: function() {

        var el = $('#listaprofissionais');
        
        $.ajax({
            type: "GET",
            url: "https://gsx2json.com/api?id=1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po&sheet=Profissionais&columns=false",
            success: function(result) {
                
                // console.log(result['rows']);
                var nomeCondominio = getCookie("nomecondominio");
                var verifica = 0;
                var output = '';

                result['rows'].reverse();

                for (var i in result['rows']) {
                    if(result['rows'][i].nomecondominio == nomeCondominio && result['rows'][i].blacklist == 0) {

                        verifica = 1;

                        var replaceContact = result['rows'][i].celularprofissional.replace(/([^\w ]|-)/g, '').replaceAll(' ', '');

                        output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                        
                        if(result['rows'][i].nomemorador == 'Admin' || result['rows'][i].flag == 'admin') {
                            output += '<div class="ribbons"><span>Administração</span></div>';
                        } else if(result['rows'][i].flag == 'morador') {
                            output += '<div class="ribbons morador"><span>Indicado por morador</span></div>';
                        }

                        output += '<h3>'+ result['rows'][i].nomeprofissional +'</h3>';
                        output += '<h4><strong>'+result['rows'][i].categoriaprofissional+'</strong></h4>';
                        output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+replaceContact+'&text=Olá, '+result['rows'][i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result['rows'][i].celularprofissional +'</a></p>';

                        if(result['rows'][i].emailprofissional != '') {
                            output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result['rows'][i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                        }
                        
                        if(result['rows'][i].siteprofissional != '') {
                            output += '<p class="siteprofissional"><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result['rows'][i].siteprofissional +' target="_blank"> Acessar o site </a></p>';
                        }
                        
                        output += '<hr>';

                        if(result['rows'][i].nomemorador == 'Admin' || result['rows'][i].flag == 'admin') {
                            output += '<p class="quemindicou"><small><strong>De: </strong><em>Admin</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                        } else if(result['rows'][i].flag == 'morador') {
                            output += '<p class="quemindicou"><small><strong>De: </strong><em>'+ result['rows'][i].nomemorador +'</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                        }
                        
                        output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result['rows'][i].indicandoprofissional + '</p>';
                        
                        output += '<hr>';
                        output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html?p=' + replaceContact + '">Relatar um problema</a></strong></p>';
                        
                        output += '</div>';
                    }
                }

                if(verifica == 1) {
                    el.html(output);

                } else {
                    output = '<p>Não há indicações até o momento.</p>';
                    el.html(output);
                }
                
            }
        });

    },
    engine: function() {
        
        var el = $('#listaprofissionais');
        var filter = $('#categoriaprofissional');

        $.ajax({
            type: "GET",
            url: "https://gsx2json.com/api?id=1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po&sheet=Profissionais&columns=false",
            success: function(result) {
                
                var 
                verifica,
                output;

                result['rows'].reverse();

                filter.on(
                    'change',
                    function() {
                        
                        var filterSelected = $(this).val();
                        var nomeCondominio = getCookie("nomecondominio");
                        
                        // console.log(verifica);
                        verifica = 0;
                        output = '';
                        
                        for (var i in result['rows']) {
                            if(result['rows'][i].nomecondominio == nomeCondominio && result['rows'][i].blacklist == 0) {

                                if(result['rows'][i].categoriaprofissional == filterSelected) {

                                    verifica = 1;
                                    
                                    var replaceContact = result['rows'][i].celularprofissional.replace(/([^\w ]|-)/g, '').replaceAll(' ', '');

                                    output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';

                                    if(result['rows'][i].nomemorador == 'Admin' || result['rows'][i].flag == 'admin') {
                                        output += '<div class="ribbons"><span>Administração</span></div>';
                                    } else if(result['rows'][i].flag == 'morador') {
                                        output += '<div class="ribbons morador"><span>Indicado por morador</span></div>';
                                    }

                                    output += '<h3>'+ result['rows'][i].nomeprofissional +'</h3>';
                                    output += '<h4><strong>'+result['rows'][i].categoriaprofissional+'</strong></h4>';
                                    output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+replaceContact+'&text=Olá, '+result['rows'][i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result['rows'][i].celularprofissional +'</a></p>';
                                    
                                    if(result['rows'][i].emailprofissional != '') {
                                        output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result['rows'][i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                                    }
                                    
                                    if(result['rows'][i].siteprofissional != '') {
                                        output += '<p class="siteprofissional"><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result['rows'][i].siteprofissional +' target="_blank">Acessar o site</a></p>';
                                    }

                                    output += '<hr>';
                                    
                                    if(result['rows'][i].nomemorador == 'Admin' || result['rows'][i].flag == 'admin') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>Admin</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    } else if(result['rows'][i].flag == 'morador') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>'+ result['rows'][i].nomemorador +'</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    }

                                    output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result['rows'][i].indicandoprofissional + '</p>';

                                    output += '<hr>';
                                    output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html?p=' + replaceContact + '">Relatar um problema</a></strong></p>';
                                    
                                    output += '</div>';
                                    
                                } else if(filterSelected == 'todos') {

                                    var replaceContact = result['rows'][i].celularprofissional.replace(/([^\w ]|-)/g, '').replaceAll(' ', '');

                                    verifica = 1;

                                    output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';

                                    if(result['rows'][i].nomemorador == 'Admin' || result['rows'][i].flag == 'admin') {
                                        output += '<div class="ribbons"><span>Administração</span></div>';
                                    } else if(result['rows'][i].flag == 'morador') {
                                        output += '<div class="ribbons morador"><span>Indicado por morador</span></div>';
                                    }

                                    output += '<h3>'+ result['rows'][i].nomeprofissional +'</h3>';
                                    output += '<h4><strong>'+result['rows'][i].categoriaprofissional+'</strong></h4>';
                                    output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+replaceContact+'&text=Olá, '+result['rows'][i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result['rows'][i].celularprofissional +'</a></p>';
                                    output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result['rows'][i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                                    output += '<p><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result['rows'][i].siteprofissional +' target="_blank">Acessar o site</a></p>';
                                    output += '<hr>';
                                    
                                    if(result['rows'][i].nomemorador == 'Admin' || result['rows'][i].flag == 'admin') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>Admin</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    } else if(result['rows'][i].flag == 'morador') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>'+ result['rows'][i].nomemorador +'</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    }

                                    output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result['rows'][i].indicandoprofissional + '</p>';
                                    
                                    output += '<hr>';
                                    output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html?p=' + replaceContact + '">Relatar um problema</a></strong></p>';

                                    output += '</div>';
                                }
                            }
                        }

                        if(verifica == 1) {
                            el.html(output);
        
                        } else {
                            output = '<p>Não há indicações até o momento.</p>';
                            el.html(output);
                        }

                    }
                )
            }
        });
    },
    blacklist: function() {

        var el = $('#blacklist');
        
        $.ajax({
            type: "GET",
            url: "https://gsx2json.com/api?id=1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po&sheet=Profissionais&columns=false",
            success: function(result) {
                
                // console.log(result['rows']);
                var verifica = 0;
                var output = '';
                var nomeCondominio = getCookie("nomecondominio");

                result['rows'].reverse();

                for (var i in result['rows']) {
                    if(result['rows'][i].nomecondominio == nomeCondominio && result['rows'][i].blacklist == 1) {

                        var verifica = 1;

                        var replaceContact = result['rows'][i].celularprofissional.replace(/([^\w ]|-)/g, '').replaceAll(' ', '');

                        output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                        output += '<h3>'+ result['rows'][i].nomeprofissional +'</h3>';
                        output += '<h4><strong>'+result['rows'][i].categoriaprofissional+'</strong></h4>';
                        output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> '+ result['rows'][i].celularprofissional.replace(/(?<=\d{2})\d/g, '*') +'</p>';

                        if(result['rows'][i].emailprofissional != '') {
                            output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result['rows'][i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                        }
                        
                        if(result['rows'][i].siteprofissional != '') {
                            output += '<p class="siteprofissional"><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result['rows'][i].siteprofissional +' target="_blank"> Acessar o site </a></p>';
                        }
                        
                        output += '<hr>';
                        output += '<p class="quemindicou"><small><strong>Por: </strong><em>Anônimo</em> em '+ new Date(result['rows'][i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                        
                        output += '<hr>';
                        output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html?p=' + replaceContact + '">Relatar um problema</a></strong></p>';
                        
                        output += '</div>';
                    }
                }

                if(verifica == 1) {
                    el.html(output);

                } else {
                    output = '<p>Não há relatos de problemas até o momento.</p>';
                    el.html(output);
                }

            }
        });

    },
    teste: function() {
        var getParameter = new URL(location.href).searchParams.get('p');
        console.log(getParameter);
    }
};
getProfissionaisJSON.init();

// validate form
var validateForm = document.getElementById("form");
if(validateForm) {
	validateForm.addEventListener("submit",function(event) {
		
        var response = grecaptcha.getResponse();
        var nomeCondominio = getCookie("nomecondominio");
        var hidden = $('input:hidden[name=nomecondominio]').val(nomeCondominio);

        // console.log(hidden);
        
		if(response.length == 0) { 	
			//reCaptcha not verified
			alert('Para prosseguir, confirme que você não é um robô.');
			event.preventDefault(); 
			return false;
		}
	});
};

// ativar sorteio
var ativarSorteio = {
    init: function() {
        this.engine();
    },
    engine: function() {
        var nome = getCookie("nomecondominio");
        var btn = $('#sorteio');
        var logoParceiro = $('.logo-parceiro');

        btn.hide();
        logoParceiro.hide();

        if(nome == 'Viva Benx Vila Mariana') {
            btn.show();
            logoParceiro.show();
        }
    }
}
ativarSorteio.init();