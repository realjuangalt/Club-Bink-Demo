// Reset onboarding flow on page load
window.onload = function() {
    // Hide all onboarding steps when the page loads to start fresh
    document.getElementById('buyerOnboardingStep1').style.display = 'none';
    document.getElementById('buyerOnboardingStep2').style.display = 'none';
    document.getElementById('buyerOnboardingStep3').style.display = 'none';
    document.getElementById('sellerOnboarding').style.display = 'none';
};

// Buyer and Seller button event listeners
// Display buyer onboarding step 1 and hide the seller onboarding section
// Smoothly scroll to the buyer onboarding section
document.getElementById('buyerButton').addEventListener('click', function() {
    document.getElementById('buyerOnboardingStep1').style.display = 'block';
    document.getElementById('sellerOnboarding').style.display = 'none';
    window.scrollTo({ top: document.getElementById('buyerOnboardingStep1').offsetTop, behavior: 'smooth' });
});

// Display seller onboarding section and hide buyer onboarding step 1
// Smoothly scroll to the seller onboarding section
document.getElementById('sellerButton').addEventListener('click', function() {
    document.getElementById('sellerOnboarding').style.display = 'block';
    document.getElementById('buyerOnboardingStep1').style.display = 'none';
    window.scrollTo({ top: document.getElementById('sellerOnboarding').offsetTop, behavior: 'smooth' });
});

// Onboarding navigation buttons
// Move from step 1 to step 2 in buyer onboarding
// Smoothly scroll to step 2
document.getElementById('nextStepBuyerOnboarding').addEventListener('click', function() {
    document.getElementById('buyerOnboardingStep1').style.display = 'none';
    document.getElementById('buyerOnboardingStep2').style.display = 'block';
    window.scrollTo({ top: document.getElementById('buyerOnboardingStep2').offsetTop, behavior: 'smooth' });
});

// Move from step 2 to step 3 in buyer onboarding
// Smoothly scroll to step 3
document.getElementById('nextStepBuyerOnboarding2').addEventListener('click', function() {
    document.getElementById('buyerOnboardingStep2').style.display = 'none';
    document.getElementById('buyerOnboardingStep3').style.display = 'block';
    window.scrollTo({ top: document.getElementById('buyerOnboardingStep3').offsetTop, behavior: 'smooth' });
});

// Move back from step 2 to step 1 in buyer onboarding
// Smoothly scroll to step 1
document.getElementById('backStepBuyerOnboarding2').addEventListener('click', function() {
    document.getElementById('buyerOnboardingStep2').style.display = 'none';
    document.getElementById('buyerOnboardingStep1').style.display = 'block';
    window.scrollTo({ top: document.getElementById('buyerOnboardingStep1').offsetTop, behavior: 'smooth' });
});

// Move back from step 3 to step 2 in buyer onboarding
// Smoothly scroll to step 2
document.getElementById('backStepBuyerOnboarding3').addEventListener('click', function() {
    document.getElementById('buyerOnboardingStep3').style.display = 'none';
    document.getElementById('buyerOnboardingStep2').style.display = 'block';
    window.scrollTo({ top: document.getElementById('buyerOnboardingStep2').offsetTop, behavior: 'smooth' });
});


// Handle final submission of buyer onboarding form
document.getElementById('submitBuyerOnboarding').addEventListener('click', function() {
    // Collect the user input values from the form
    const email = document.getElementById('emailInput').value;
    const amount = document.getElementById('amountInput').value;
    // Check if all fields are filled in before proceeding
    if (email && amount && payday) {
        alert('Thank you for joining Bink Club! You will receive reminders based on your input.');
        // Here we would send this data to the backend for processing
    } else {
        alert('Please fill in all the fields to proceed.');
    }
});

// Chart.js setup for Bitcoin price chart
var ctx = document.getElementById('chartCanvas').getContext('2d');
var bitcoinChart = new Chart(ctx, {
    type: 'line', // Line chart to display Bitcoin price trend
    data: {
        labels: [], // Placeholder for date labels from API
        datasets: [
            {
                label: 'Bitcoin Price (Weekly)',
                data: [], // Placeholder for price data from API
                borderColor: '#f5c518', // Line color for Bitcoin price
                fill: false // Do not fill under the line
            },
            {
                label: 'Moving Average',
                data: [], // Placeholder for moving average data
                borderColor: '#ffba00', // Line color for moving average
                borderDash: [5, 5], // Dashed line to differentiate moving average
                fill: false // Do not fill under the line
            }
        ]
    },
    options: {
        responsive: true, // Chart adjusts to the size of its container
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date' // X-axis title
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USD)' // Y-axis title
                }
            }
        }
    }
});

// Placeholder function to fetch data from an API and update the chart
function updateChart() {
    // This function should call the API to get the latest Bitcoin price data
    // For example purposes, we use placeholder data
    const exampleDates = ['2024-10-01', '2024-10-08', '2024-10-15', '2024-10-22'];
    const examplePrices = [28000, 29000, 30000, 31000];
    const exampleMovingAverage = [28500, 28750, 29500, 30500];

    // Update the chart data with example data
    bitcoinChart.data.labels = exampleDates;
    bitcoinChart.data.datasets[0].data = examplePrices;
    bitcoinChart.data.datasets[1].data = exampleMovingAverage;
    bitcoinChart.update(); // Refresh the chart with the new data
}

// Call updateChart to initially load the data
updateChart();
