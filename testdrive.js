document.addEventListener("DOMContentLoaded", function () {

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {

        alert("Please login first to book a test drive.");

        window.location.href = "login.html";

        return;
    }

    const user = JSON.parse(loggedInUser);

    const testDriveForm = document.getElementById("testDriveForm");

    const emailField = document.getElementById("email");

    // Automatically display logged-in user's email
    emailField.value = user.email;


    testDriveForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const mobile = document.getElementById("mobile").value;
        const city = document.getElementById("city").value;
        const evModel = document.getElementById("evModel").value;
        const preferredDate = document.getElementById("preferredDate").value;
        const preferredTime = document.getElementById("preferredTime").value;
        const additionalNotes = document.getElementById("additionalNotes").value;


        try {

            const response = await fetch(
                "http://localhost:8080/api/testdrive/book",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        fullName: fullName,

                        mobile: mobile,

                        email: user.email,

                        city: city,

                        evModel: evModel,

                        preferredDate: preferredDate,

                        preferredTime: preferredTime,

                        additionalNotes: additionalNotes
                    })
                }
            );


            const result = await response.text();


            if (response.ok) {

                const booking = JSON.parse(result);

                alert(
                    "Test Drive Booked Successfully!\n\n" +
                    "Name: " + booking.fullName + "\n" +
                    "EV Model: " + booking.evModel + "\n" +
                    "Date: " + booking.preferredDate + "\n" +
                    "Time: " + booking.preferredTime + "\n\n" +
                    "Our showroom team will contact you to confirm availability."
                );

                testDriveForm.reset();

                // Put the logged-in email back after reset
                emailField.value = user.email;

            } else {

                alert("Booking failed: " + result);
            }


        } catch (error) {

            console.error("Booking error:", error);

            alert("Unable to connect to the server.");
        }

    });

});