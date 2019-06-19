$(function() {
    $('.checked').click(function(e) {
        e.preventDefault();
        var dialog = $('<p>Are you sure?</p>').dialog({
            buttons: {
                "Yes": function() {alert('you chose yes');},
                "No":  function() {alert('you chose no');},
                "Cancel":  function() {
                    alert('you chose cancel');
                    dialog.dialog('close');
                }
            }
        });
    });
});