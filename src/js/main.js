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
    }).then(
        alert('profissional cadastrado!')
    );
}

document.querySelector('form').addEventListener('submit', handleSubmit);
