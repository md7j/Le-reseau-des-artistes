function like(id) {
    console.log("like")
    $.post( "/fil/like", { value: id });
    $('#like').attr( "onclick", $('#like').attr( "onclick" ).replace('like', 'dislike'))
    $('#like').attr( "class", $('#like').attr( "class" ).replace('btn-outline-success', 'btn-outline-danger'))
    $('#like').html("Retirer like")
    $('#nbLikes').html(parseInt($('#nbLikes').html()) + 1)
    // location.reload();
}

function dislike(id) {
    console.log("dislike")
    $.post( "/fil/dislike", { value: id });
    $('#like').attr( "onclick", $('#like').attr( "onclick" ).replace('dislike', 'like'))
    $('#like').attr( "class", $('#like').attr( "class" ).replace('btn-outline-danger', 'btn-outline-success'))
    $('#like').html("Like")
    $('#nbLikes').html(parseInt($('#nbLikes').html()) - 1)
    // location.reload();
}