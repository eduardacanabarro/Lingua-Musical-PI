// cliente banco de dados
const userFormLogin = document.getElementById('user-form-login')

userFormLogin.addEventListener("submit", (e) => {
    const loginEmail = document.getElementById("emailLogin").value;
    const loginSenha = document.getElementById("senhaLogin").value;
  
    fetch('http://localhost:3000/usuario')
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar dados dos usuários');
        }
        return response.json();
      })
      .then(data => {
        const usuarioEncontrado = data.find(user => user.email === loginEmail && user.senha === loginSenha);
  
        if (usuarioEncontrado) {
          alert("Login realizado com sucesso!");
          console.log("login realizado")

          window.location.href = "telaInicial.html"
        } else {
          alert("Email ou senha incorretos");
          console.log("erro")
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }
);