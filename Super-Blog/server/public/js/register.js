document
  .getElementById("post-Register")
  .addEventListener("click", postRegister);

function postRegister() {
  let userid = document.getElementById("userid").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  if (/^[a-z][a-z0-9_]*$/.test(userid)) {
    axios
      .post("/register", {
        userid: userid,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("hello");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("User ID didn't match the requested format.");
  }
}
