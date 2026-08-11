const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const fullname =
        document.getElementById("fullname").value;

    const email =
        document.getElementById("email").value;

    const mobile =
        document.getElementById("mobile").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check passwords

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/users/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    fullname: fullname,
                    email: email,
                    mobile: mobile,
                    password: password

                })
            }
        );


        if (response.ok) {

            const registeredUser =
                await response.json();

            console.log(
                "Registered user:",
                registeredUser
            );

            alert(
                "Account created successfully!"
            );

            window.location.href =
                "login.html";

        }

        else {

            const message =
                await response.text();

            alert(message);
        }


    }

    catch (error) {

        console.error(
            "Registration error:",
            error
        );

        alert(
            "Unable to connect to the server. " +
            "Please make sure Spring Boot is running."
        );
    }

});