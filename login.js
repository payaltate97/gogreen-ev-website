const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:8080/api/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {

            const user = await response.json();

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );

            alert("Login Successful!");

            window.location.href = "homepage.html";

        } else {

            const message = await response.text();

            alert(message);
        }

    } catch (error) {

        console.error("Login error:", error);

        alert("Cannot connect to the server. Please make sure Spring Boot is running.");
    }

});