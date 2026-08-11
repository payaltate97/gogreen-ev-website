function logout() 
{

    localStorage.removeItem("loggedInUser");

    alert("You have been logged out.");

    window.location.href = "login.html";
}