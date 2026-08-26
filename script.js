// ==========================================
// FLIGHT SEARCH & PRICE COMPARISON
// ==========================================

function searchFlights() {

    // Get input elements
    const fromElement = document.getElementById("fromCity");
    const toElement = document.getElementById("toCity");
    const dateElement = document.getElementById("travelDate");
    const results = document.getElementById("searchResults");

    // Safety check
    if (!fromElement || !toElement || !dateElement || !results) {
        console.error("Required HTML elements are missing.");

        return;
    }

    // Get values
    const from = fromElement.value.trim();
    const to = toElement.value.trim();
    const date = dateElement.value;

    // ==========================================
    // CHECK USER INPUT
    // ==========================================

    if (!from || !to || !date) {

        results.innerHTML = `
            <div style="
                padding:15px;
                background:#fee2e2;
                color:#991b1b;
                border-radius:8px;
                margin-top:15px;
            ">
                ⚠️ Please enter From, To and Travel Date.
            </div>
        `;

        return;
    }

    // ==========================================
    // DEMO FLIGHT DATABASE
    // ==========================================

    const routeDatabase = {

        "delhi-mumbai": [
            {
                airline: "IndiGo",
                price: 5350,
                duration: "2h 10m",
                stops: "Non-stop"
            },
            {
                airline: "Air India",
                price: 5120,
                duration: "2h 15m",
                stops: "Non-stop"
            },
            {
                airline: "Akasa Air",
                price: 5480,
                duration: "2h 20m",
                stops: "Non-stop"
            },
            {
                airline: "SpiceJet",
                price: 5650,
                duration: "2h 30m",
                stops: "Non-stop"
            }
        ],

        "mumbai-bangalore": [
            {
                airline: "IndiGo",
                price: 3200,
                duration: "1h 45m",
                stops: "Non-stop"
            },
            {
                airline: "Air India",
                price: 3450,
                duration: "1h 50m",
                stops: "Non-stop"
            },
            {
                airline: "Akasa Air",
                price: 2980,
                duration: "1h 40m",
                stops: "Non-stop"
            },
            {
                airline: "SpiceJet",
                price: 3350,
                duration: "2h 00m",
                stops: "Non-stop"
            }
        ],

        "delhi-bangalore": [
            {
                airline: "IndiGo",
                price: 6100,
                duration: "2h 40m",
                stops: "Non-stop"
            },
            {
                airline: "Air India",
                price: 5850,
                duration: "2h 45m",
                stops: "Non-stop"
            },
            {
                airline: "Akasa Air",
                price: 6250,
                duration: "2h 40m",
                stops: "Non-stop"
            },
            {
                airline: "SpiceJet",
                price: 5700,
                duration: "3h 00m",
                stops: "Non-stop"
            }
        ],

        "delhi-kolkata": [
            {
                airline: "IndiGo",
                price: 3950,
                duration: "2h 15m",
                stops: "Non-stop"
            },
            {
                airline: "Air India",
                price: 4100,
                duration: "2h 20m",
                stops: "Non-stop"
            },
            {
                airline: "Akasa Air",
                price: 3800,
                duration: "2h 20m",
                stops: "Non-stop"
            },
            {
                airline: "SpiceJet",
                price: 4250,
                duration: "2h 30m",
                stops: "Non-stop"
            }
        ],

        "bangalore-hyderabad": [
            {
                airline: "IndiGo",
                price: 2800,
                duration: "1h 10m",
                stops: "Non-stop"
            },
            {
                airline: "Air India",
                price: 2950,
                duration: "1h 15m",
                stops: "Non-stop"
            },
            {
                airline: "Akasa Air",
                price: 2650,
                duration: "1h 10m",
                stops: "Non-stop"
            },
            {
                airline: "SpiceJet",
                price: 3100,
                duration: "1h 20m",
                stops: "Non-stop"
            }
        ],

        "chennai-delhi": [
            {
                airline: "IndiGo",
                price: 7200,
                duration: "2h 45m",
                stops: "Non-stop"
            },
            {
                airline: "Air India",
                price: 6850,
                duration: "2h 50m",
                stops: "Non-stop"
            },
            {
                airline: "Akasa Air",
                price: 7500,
                duration: "2h 50m",
                stops: "Non-stop"
            },
            {
                airline: "SpiceJet",
                price: 6700,
                duration: "3h 00m",
                stops: "Non-stop"
            }
        ]
    };

    // ==========================================
    // CREATE ROUTE KEY
    // ==========================================

    const routeKey =
        from.toLowerCase().trim().replace(/\s+/g, "-") +
        "-" +
        to.toLowerCase().trim().replace(/\s+/g, "-");

    console.log("Route Key:", routeKey);

    // ==========================================
    // FIND OFFERS
    // ==========================================

    const offers = routeDatabase[routeKey];

    // ==========================================
    // ROUTE NOT AVAILABLE
    // ==========================================

    if (!offers) {

        results.innerHTML = `
            <div style="
                padding:18px;
                background:#fff7ed;
                color:#9a3412;
                border-radius:8px;
                margin-top:15px;
            ">

                <b>✈️ Route not available in demo database</b>

                <p style="margin:8px 0 0;">
                    Try one of these routes:
                </p>

                <p style="
                    margin:8px 0 0;
                    font-weight:bold;
                ">
                    Delhi → Mumbai<br>
                    Mumbai → Bangalore<br>
                    Delhi → Bangalore<br>
                    Delhi → Kolkata<br>
                    Bangalore → Hyderabad<br>
                    Chennai → Delhi
                </p>

            </div>
        `;

        return;
    }

    // ==========================================
    // FIND CHEAPEST FLIGHT
    // ==========================================

    const cheapest = offers.reduce(
        (min, flight) => {
            return flight.price < min.price ? flight : min;
        },
        offers[0]
    );

    // ==========================================
    // SORT OFFERS
    // ==========================================

    const sortedOffers = [...offers].sort(
        (a, b) => a.price - b.price
    );

    // ==========================================
    // DISPLAY RESULTS
    // ==========================================

    results.innerHTML = `

        <h3 style="margin-top:20px;">
            ✈️ Available Flight Offers
        </h3>

        <p style="
            color:#6b7280;
            margin-bottom:15px;
        ">
            ${from.toUpperCase()}
            →
            ${to.toUpperCase()}
            |
            ${date}
        </p>

        <div style="
            display:grid;
            gap:10px;
        ">

            ${sortedOffers.map(flight => `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:16px;
                    border:1px solid #e5e7eb;
                    border-radius:10px;
                    background:white;
                ">

                    <div>

                        <b style="font-size:17px;">
                            ${flight.airline}
                        </b>

                        <div style="
                            color:#6b7280;
                            margin-top:5px;
                            font-size:13px;
                        ">
                            ${flight.stops}
                            •
                            ${flight.duration}
                        </div>

                    </div>

                    <div style="text-align:right;">

                        <b style="font-size:19px;">
                            ₹${flight.price.toLocaleString("en-IN")}
                        </b>

                        ${
                            flight.airline === cheapest.airline
                                ? `
                                    <div style="
                                        color:#16a34a;
                                        font-size:12px;
                                        font-weight:bold;
                                        margin-top:4px;
                                    ">
                                        ⭐ BEST PRICE
                                    </div>
                                `
                                : ""
                        }

                    </div>

                </div>

            `).join("")}

        </div>

        <!-- BEST PRICE BOX -->

        <div style="
            margin-top:18px;
            padding:18px;
            background:#ecfdf5;
            border-left:5px solid #16a34a;
            border-radius:8px;
        ">

            <div style="
                font-size:15px;
                font-weight:bold;
                color:#166534;
            ">
                🏆 Best Price Recommendation
            </div>

            <div style="
                margin-top:7px;
                font-size:20px;
                font-weight:bold;
            ">
                ${cheapest.airline}
                —
                ₹${cheapest.price.toLocaleString("en-IN")}
            </div>

            <div style="
                margin-top:5px;
                font-size:13px;
                color:#166534;
            ">
                Lowest available price in our comparison.
            </div>

        </div>

        <!-- DEMO NOTICE -->

        <p style="
            margin-top:12px;
            font-size:12px;
            color:#6b7280;
        ">
            * Prototype demonstration data.
            Live airline/OTA prices are not connected yet.
        </p>
    `;

    // ==========================================
    // CONSOLE LOG
    // ==========================================

    console.log("Flight Search:");
    console.log("From:", from);
    console.log("To:", to);
    console.log("Date:", date);
    console.log("Route:", routeKey);
    console.log("Offers:", offers);
    console.log("Best Price:", cheapest);
}