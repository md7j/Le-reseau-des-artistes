$("#register").hide()

function login_btn() {
    $("#register").hide()
    $("#login").show()
}

function register_btn() {
    $("#login").hide()
    $("#register").show()
}

// function login(form) {
//     $.post( "/auth/login", { email: form.elements["username"].value, password: form.elements["password"].value });
// }

// function register(form) {
//     console.log(form.elements["username"].value)
// }