var media
var type

function loadImage(event) {
    type = "image"
    media = document.getElementById('photo').files[0]
    $('#video').hide()
    $('#music').hide()
};

function loadVideo(event) {
    type = "video"
    media = document.getElementById('video').files[0]
    $('#photo').hide()
    $('#music').hide()
};

function loadMusic(event) {
    type = "music"
    media = document.getElementById('music').files[0]
    $('#video').hide()
    $('#photo').hide()
};

function addArticle() {
    const description = document.getElementById('description').value
    console.log("DESCRIPTION", description)
    console.log("TYPE", media)
    console.log("MEDIA", type)
    var form_data = new FormData();
    form_data.append('type', type);
    form_data.append('media', media);
    form_data.append('description', description);
    $.ajax({
        url: '/addPublication', // point to server-side PHP script 
        dataType: 'json',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(data){
            location.reload(); // display response from the PHP script, if any
        }
     });
}

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