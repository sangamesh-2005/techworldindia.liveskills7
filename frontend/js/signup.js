<!DOCTYPE html>
<html>
<head>
  <title>Signup</title>
</head>

<body>

<form>
  <input type="text" id="name" placeholder="Full Name" required>
  <input type="email" id="email" placeholder="Email" required>
  <input type="password" id="password" placeholder="Password" required>
  <input type="Retype password" id="Retype password" placeholder="Retype Password" required>
  <button type="submit">Sign Up</button>
</form>

<script>
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const Retype password = document.getElementById("Retype password").value;


    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password); 
    localStorage.setItem("Retype password", Retypepassword);
    

    alert("Signup successful!");
});
</script>

</body>
</html>
