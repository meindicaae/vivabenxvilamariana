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
