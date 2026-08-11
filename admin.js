const bookingTableBody = document.getElementById("bookingTableBody");


/* =========================
   Load All Bookings
   ========================= */

async function loadBookings()
 {

    try {

        const response = await fetch(
            "http://localhost:8080/api/testdrive/all"
        );

        if (!response.ok) {
            throw new Error("Failed to load bookings.");
        }

        const bookings = await response.json();

        bookingTableBody.innerHTML = "";


        /* No bookings */

        if (bookings.length === 0) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td colspan="10">
                    No test drive bookings found.
                </td>
            `;

            bookingTableBody.appendChild(row);

            return;
        }


        /* Display bookings */

        bookings.forEach(function(booking) {

            const row = document.createElement("tr");

            const status = booking.status || "PENDING";


            row.innerHTML = `

                <td>${booking.id}</td>

                <td>${booking.fullName || "-"}</td>

                <td>${booking.mobile || "-"}</td>

                <td>${booking.email || "-"}</td>

                <td>${booking.city || "-"}</td>

                <td>${booking.evModel || "-"}</td>

                <td>${booking.preferredDate || "-"}</td>

                <td>${booking.preferredTime || "-"}</td>

                <td class="status">
                    ${status}
                </td>

                <td>

                    <button
                        class="confirm-btn"
                        onclick="confirmBooking(${booking.id})">

                        ${status === "CONFIRMED"
                            ? "Confirmed"
                            : "Confirm"}

                    </button>


                    <button
                        class="cancel-btn"
                        onclick="cancelBooking(${booking.id})">

                        ${status === "CANCELLED"
                            ? "Cancelled"
                            : "Cancel"}

                    </button>

                </td>

            `;

            bookingTableBody.appendChild(row);

        });


    } catch (error) {

        console.error("Error loading bookings:", error);

        bookingTableBody.innerHTML = `
            <tr>
                <td colspan="10">
                    Unable to load bookings.
                </td>
            </tr>
        `;
    }
}


/* =========================
   Confirm Booking
   ========================= */

async function confirmBooking(id) {

    const confirmAction = confirm(
        "Are you sure you want to confirm this booking?"
    );

    if (!confirmAction) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/testdrive/${id}/confirm`,
            {
                method: "PUT"
            }
        );


        if (response.ok) {

            alert("Booking confirmed successfully.");

            loadBookings();

        } else {

            const message = await response.text();

            alert(message);
        }


    } catch (error) {

        console.error("Confirm error:", error);

        alert("Unable to connect to the server.");
    }
}


/* =========================
   Cancel Booking
   ========================= */

async function cancelBooking(id) {

    const cancelAction = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!cancelAction) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/testdrive/${id}/cancel`,
            {
                method: "PUT"
            }
        );


        if (response.ok) {

            alert("Booking cancelled successfully.");

            loadBookings();

        } else {

            const message = await response.text();

            alert(message);
        }


    } catch (error) {

        console.error("Cancel error:", error);

        alert("Unable to connect to the server.");
    }
}


/* =========================
   Load bookings on page open
   ========================= */

loadBookings();