function add_friend (name) {
    $.post( "/friends/addFriend", { name: name });
}

$("#search").on("input", function() {
    $.get( "/friends/search", { value: $(this).val()}).done(function( data ) {
        content = ""
        data.forEach(element => {
            content += "<a class='dropdown-item search_item' href='#' style='font-size: 1.2em;' onclick='add_friend(\"" + element + "\")'><i class='fas fa-user-plus'></i><span class='ml-2'>" + element + "</span></a>"
        });
        $( ".search_item" ).remove();
        $("#autocomplete").after(content)
        console.log(data)
        // alert( "Data Loaded: " + data );
    });
 });