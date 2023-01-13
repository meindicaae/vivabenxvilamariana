// /*
// ####################################################
// VALIDATE FORM
// ####################################################
// */

// functions
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	"use strict";
	window.addEventListener(
		"load",
		function () {
			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			var forms = document.getElementsByClassName("validation");
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function (form) {
				form.addEventListener(
					"submit",
					function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add("was-validated");
					},
					false
				);
			});
		},
		false
	);
})();

//Email
$(".email").inputmask({
	mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
	greedy: false,
	onBeforePaste: function (pastedValue, opts) {
		pastedValue = pastedValue.toLowerCase();
		return pastedValue.replace("mailto:", "");
	},
	definitions: {
		'*': {
		validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
		casing: "lower"
		}
	}
})

// CPF
$(".cpf").inputmask("999.999.999-99");

// CNPJ
$(".cnpj").inputmask("99.999.999/9999-99");

// RG
$(".rg").inputmask("99.999.999-9");

// Fixo
$(".fixo").inputmask("(99) 9999-9999");

// Celular
// $(".celular").inputmask("(99) 99999-9999");
$(".celular").inputmask({
	mask: ['(999) 999-9999', '(99) 99999-9999', '(99) 9999-999999'],
	keepStatic: true
});

// CEP
$(".cep").inputmask("99999-999");

// Data Nascimento
$(".dtnascimento").inputmask("99/99/9999");

// CPF CNPJ
$("input[id*='cpfcnpj']").inputmask({
	mask: ['999.999.999-99', '99.999.999/9999-99'],
	keepStatic: true
});


// recaptcha v2
var recaptchaVerify = {
    init: function() {
        this.engine();
    },
    engine: function() {
		document.getElementById("form").addEventListener("submit",function(event) {
	
			var response = grecaptcha.getResponse();
			
			if(response.length == 0) { 	
				//reCaptcha not verified
				event.preventDefault(); 
				
				alert('Para prosseguir, confirme que você não é um robô.');
		
				return false;
			}
			//captcha verified
			//do the rest of your validations here
		});
	}
}