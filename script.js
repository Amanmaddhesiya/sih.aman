// ==========================================
// APIx FLIGHT SEARCH ENGINE
// ==========================================


// ==========================================
// DEMO FLIGHT DATABASE
// ==========================================

const flightDatabase = {

    "delhi-mumbai": [
        {
            airline: "Air India",
            price: 5120,
            duration: "2h 15m",
            stops: "Non-stop"
        },
        {
            airline: "IndiGo",
            price: 5350,
            duration: "2h 10m",
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
            airline: "Akasa Air",
            price: 2980,
            duration: "1h 40m",
            stops: "Non-stop"
        },
        {
            airline: "IndiGo",
            price: 3200,
            duration: "1h 45m",
            stops: "Non-stop"
        },
        {
            airline: "SpiceJet",
            price: 3350,
            duration: "2h 00m",
            stops: "Non-stop"
        },
        {
            airline: "Air India",
            price: 3450,
            duration: "1h 50m",
            stops: "Non-stop"
        }
    ],


    "delhi-bangalore": [
        {
            airline: "SpiceJet",
            price: 5700,
            duration: "3h 00m",
            stops: "Non-stop"
        },
        {
            airline: "Air India",
            price: 5850,
            duration: "2h 45m",
            stops: "Non-stop"
        },
        {
            airline: "IndiGo",
            price: 6100,
            duration: "2h 40m",
            stops: "Non-stop"
        },
        {
            airline: "Akasa Air",
            price: 6250,
            duration: "2h 40m",
            stops: "Non-stop"
        }
    ],


    "delhi-kolkata": [
        {
            airline: "Akasa Air",
            price: 3800,
            duration: "2h 20m",
            stops: "Non-stop"
        },
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
            airline: "SpiceJet",
            price: 4250,
            duration: "2h 30m",
            stops: "Non-stop"
        }
    ],


    "bangalore-hyderabad": [
        {
            airline: "Akasa Air",
            price: 2650,
            duration: "1h 10m",
            stops: "Non-stop"
        },
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
            airline: "SpiceJet",
            price: 3100,
            duration: "1h 20m",
            stops: "Non-stop"
        }
    ],


    "chennai-delhi": [
        {
            airline: "SpiceJet",
            price: 6700,
            duration: "3h 00m",
            stops: "Non-stop"
        },
        {
            airline: "Air India",
            price: 6850,
            duration: "2h 50m",
            stops: "Non-stop"
        },
        {
            airline: "IndiGo",
            price: 7200,
            duration: "2h 45m",
            stops: "Non-stop"
        },
        {
            airline: "Akasa Air",
            price: 7500,
            duration: "2h 50m",
            stops: "Non-stop"
        }
    ]

};


// ==========================================
// SEARCH FLIGHTS
// ==========================================

function searchFlights() {

    const from = document
        .getElementById("from")
        .value
        .trim();

    const to = document
        .getElementById("to")
        .value
        .trim();

    const date = document
        .getElementById("date")
        .value;

    const results = document
        .getElementById("searchResults");


    // Check input

    if (!from || !to || !date) {

        results.innerHTML = `
            <div class="error-box">
                ⚠️ Please enter From, To and Travel Date.
            </div>
        `;

        return;
    }


    // Create route key

    const routeKey =
        from.toLowerCase().replace(/\s+/g, "-") +
        "-" +
        to.toLowerCase().replace(/\s+/g, "-");


    console.log("Searching:", routeKey);


    // Find flights

    const flights = flightDatabase[routeKey];


    // Route unavailable

    if (!flights) {

        results.innerHTML = `
            <div class="no-route">

                <h5>
                    ✈️ Route not available in demo database
                </h5>

                <p>
                    Try:
                </p>

                <strong>
                    Delhi → Mumbai<br>
                    Mumbai → Bangalore<br>
                    Delhi → Bangalore<br>
                    Delhi → Kolkata<br>
                    Bangalore → Hyderabad<br>
                    Chennai → Delhi
                </strong>

            </div>
        `;

        return;
    }


    // Sort cheapest first

    const sortedFlights = [...flights].sort(
        (a, b) => a.price - b.price
    );


    const cheapest = sortedFlights[0];


    // Display results

    results.innerHTML = `

        <div class="results-header">

            <h4>
                ✈️ Available Flight Offers
            </h4>

            <p>
                ${from.toUpperCase()}
                →
                ${to.toUpperCase()}
                |
                ${date}
            </p>

        </div>


        <div class="flight-results">

            ${sortedFlights.map((flight, index) => `

                <div class="flight-card">

                    <div>

                        <div class="airline">
                            ${flight.airline}
                        </div>

                        <div class="flight-details">

                            ${flight.stops}
                            •
                            ${flight.duration}

                        </div>

                    </div>


                    <div class="flight-price">

                        <strong>
                            ₹${flight.price.toLocaleString("en-IN")}
                        </strong>

                        ${
                            index === 0
                            ?
                            `
                            <div class="best-badge">
                                ⭐ BEST PRICE
                            </div>
                            `
                            :
                            ""
                        }

                    </div>

                </div>

            `).join("")}

        </div>


        <div class="best-price">

            <div>
                🏆 <strong>Best Price Recommendation</strong>
            </div>

            <div class="best-price-value">

                ${cheapest.airline}
                —
                ₹${cheapest.price.toLocaleString("en-IN")}

            </div>

            <small>
                Lowest price available in our demo database.
            </small>

        </div>


        <div class="demo-notice">

            ℹ️ Demo data only — live airline prices are not connected yet.

        </div>

    `;

}


// ==========================================
// PRICE TREND CHART
// ==========================================

const trendCanvas =
    document.getElementById("trendChart");


if (trendCanvas) {

    new Chart(trendCanvas.getContext("2d"), {

        type: "line",

        data: {

            labels: [
                "Day 1",
                "Day 2",
                "Day 3",
                "Day 4",
                "Day 5",
                "Day 6",
                "Day 7"
            ],

            datasets: [

                {
                    label: "DEL-BOM",

                    data: [
                        5100,
                        5150,
                        5200,
                        5300,
                        5280,
                        5350,
                        5400
                    ],

                    borderColor: "#1e40af",

                    backgroundColor:
                        "rgba(30,64,175,0.1)",

                    tension: 0.4,

                    fill: true
                },


                {
                    label: "BLR-DEL",

                    data: [
                        4900,
                        4850,
                        4800,
                        4750,
                        4700,
                        4750,
                        4800
                    ],

                    borderColor: "#f59e0b",

                    backgroundColor:
                        "rgba(245,158,11,0.1)",

                    tension: 0.4,

                    fill: true
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}


// ==========================================
// LEAD TIME CHART
// ==========================================

const leadCanvas =
    document.getElementById("leadTimeChart");


if (leadCanvas) {

    new Chart(leadCanvas.getContext("2d"), {

        type: "bar",

        data: {

            labels: [
                "Same Day",
                "T+7",
                "T+15",
                "T+30"
            ],

            datasets: [

                {
                    label: "Average Fare (₹)",

                    data: [
                        8500,
                        6100,
                        4800,
                        3950
                    ],

                    backgroundColor: [
                        "#ef4444",
                        "#f59e0b",
                        "#3b82f6",
                        "#10b981"
                    ],

                    borderRadius: 8

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            }

        }

    });

}


// ==========================================
// CSV REPORT
// ==========================================

function downloadReport() {

    const csv = `
Route,Base Fare,Taxes & Fees,Total Fare,24h Trend
DEL-BOM,4200,1150,5350,+4.5%
BLR-DEL,3800,950,4750,-1.2%
DEL-CCU,3100,850,3950,+2.8%
BOM-BLR,2500,700,3200,-0.5%
`.trim();


    const blob = new Blob(
        [csv],
        { type: "text/csv" }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "APIx-airfare-report.csv";


    link.click();


    URL.revokeObjectURL(url);

}
