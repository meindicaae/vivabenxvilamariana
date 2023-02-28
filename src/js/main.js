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
	var autoCompleteResult = matchCondominio(val);
	document.getElementById("resultadoNomeCondominio").innerHTML = "";
	for (var i = 0, limit = 10, len = autoCompleteResult.length; i < len  && i < limit; i++) {
		document.getElementById("resultadoNomeCondominio").innerHTML += "<a href='javascript:void(0)' onclick='setSearch(\"" + autoCompleteResult[i] + "\")'>" + autoCompleteResult[i] + "</a>";
	}
};

function setSearch(value) {
    document.getElementById('nomecondominio').value = value;
	document.getElementById("resultadoNomeCondominio").innerHTML = "";
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
    document.getElementById("resultadoNomeCondominio").innerHTML += "<a href='javascript:void(0)' onclick='setSearch(\"" + autoCompleteResult[i] + "\")'>" + autoCompleteResult[i] + "</a>";
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
            url: "https://opensheet.elk.sh/1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po/1",
            success: function(result) {
                
                // console.log(result);
                var nomeCondominio = getCookie("nomecondominio");
                var verifica = 0;
                var output = '';

                result.reverse();

                for (var i in result) {
                    if(result[i].nomecondominio == nomeCondominio && result[i].blacklist == 0) {
                        
                        verifica = 1;

                        output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                        
                        if(result[i].nomemorador == 'Admin' || result[i].flag == 'admin') {
                            output += '<div class="ribbons"><span>Administração</span></div>';
                        } else if(result[i].flag == 'morador') {
                            output += '<div class="ribbons morador"><span>Indicado por morador</span></div>';
                        }

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

                        if(result[i].nomemorador == 'Admin' || result[i].flag == 'admin') {
                            output += '<p class="quemindicou"><small><strong>De: </strong><em>Admin</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                        } else if(result[i].flag == 'morador') {
                            output += '<p class="quemindicou"><small><strong>De: </strong><em>'+ result[i].nomemorador +'</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                        }
                        
                        output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result[i].indicandoprofissional + '</p>';
                        
                        output += '<hr>';
                        output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html">Relatar um problema</a></strong></p>';
                        
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
            url: "https://opensheet.elk.sh/1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po/1",
            success: function(result) {
                
                var 
                verifica,
                output;

                result.reverse();

                filter.on(
                    'change',
                    function() {
                        
                        var filterSelected = $(this).val();
                        var nomeCondominio = getCookie("nomecondominio");
                        
                        // console.log(verifica);
                        verifica = 0;
                        output = '';
                        
                        for (var i in result) {
                            if(result[i].nomecondominio == nomeCondominio && result[i].blacklist == 0) {

                                if(result[i].categoriaprofissional == filterSelected) {

                                    verifica = 1;

                                    output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';

                                    if(result[i].nomemorador == 'Admin' || result[i].flag == 'admin') {
                                        output += '<div class="ribbons"><span>Administração</span></div>';
                                    } else if(result[i].flag == 'morador') {
                                        output += '<div class="ribbons morador"><span>Indicado por morador</span></div>';
                                    }

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
                                    
                                    if(result[i].nomemorador == 'Admin' || result[i].flag == 'admin') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>Admin</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    } else if(result[i].flag == 'morador') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>'+ result[i].nomemorador +'</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    }

                                    output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result[i].indicandoprofissional + '</p>';

                                    output += '<hr>';
                                    output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html">Relatar um problema</a></strong></p>';
                                    
                                    output += '</div>';
                                    
                                } else if(filterSelected == 'todos') {

                                    verifica = 1;

                                    output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';

                                    if(result[i].nomemorador == 'Admin' || result[i].flag == 'admin') {
                                        output += '<div class="ribbons"><span>Administração</span></div>';
                                    } else if(result[i].flag == 'morador') {
                                        output += '<div class="ribbons morador"><span>Indicado por morador</span></div>';
                                    }

                                    output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                                    output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                                    output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> <a href="https://api.whatsapp.com/send?phone=55'+result[i].celularprofissional+'&text=Olá, '+result[i].nomeprofissional+'!%20Peguei%20seu%20contato%20no%20Me%20Indica%20Aê,%20e%20eu%20gostaria%20de%20fazer%20um%20orçamento%20com%20você." target="_blank">'+ result[i].celularprofissional +'</a></p>';
                                    output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result[i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                                    output += '<p><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank">Acessar o site</a></p>';
                                    output += '<hr>';
                                    
                                    if(result[i].nomemorador == 'Admin' || result[i].flag == 'admin') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>Admin</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    } else if(result[i].flag == 'morador') {
                                        output += '<p class="quemindicou"><small><strong>De: </strong><em>'+ result[i].nomemorador +'</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                                    }

                                    output += '<p class="comentario">'+ '<i class="fa fa-quote-left mr-2" aria-hidden="true"></i> ' + result[i].indicandoprofissional + '</p>';
                                    
                                    output += '<hr>';
                                    output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html">Relatar um problema</a></strong></p>';

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
            url: "https://opensheet.elk.sh/1f-Cq5gpr03s6C0NZGdJH42LLFVp7UVn2YhSBQIdD7Po/1",
            success: function(result) {
                
                // console.log(result);
                var verifica = 0;
                var output = '';
                var nomeCondominio = getCookie("nomecondominio");

                result.reverse();

                for (var i in result) {
                    if(result[i].nomecondominio == nomeCondominio && result[i].blacklist == 1) {

                        var verifica = 1;

                        output += '<div class="col-lg-12 col-md-12 col-sm-12 col-12">';
                        output += '<h3>'+ result[i].nomeprofissional +'</h3>';
                        output += '<h4><strong>'+result[i].categoriaprofissional+'</strong></h4>';
                        output += '<p><i class="fa fa-whatsapp" aria-hidden="true"></i> '+ result[i].celularprofissional.replace(/(?<=\d{2})\d/g, '*') +'</p>';

                        if(result[i].emailprofissional != '') {
                            output += '<p><i class="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:'+result[i].emailprofissional+'?subject=Me Indica Aê - Solicitação de Orçamento">Enviar email</a></p>';
                        }
                        
                        if(result[i].siteprofissional != '') {
                            output += '<p class="siteprofissional"><i class="fa fa-globe" aria-hidden="true"></i> <a href='+ result[i].siteprofissional +' target="_blank"> Acessar o site </a></p>';
                        }
                        
                        output += '<hr>';
                        output += '<p class="quemindicou"><small><strong>Por: </strong><em>Anônimo</em> em '+ new Date(result[i].datacadastro).toLocaleString('pt-BR') +'</small></p>';
                        
                        output += '<hr>';
                        output += '<p class="relatar-problema"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> <strong><a href="/relatar-problema.html">Relatar um problema</a></strong></p>';
                        
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