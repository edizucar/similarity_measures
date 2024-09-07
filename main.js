let data = {}; // To store the loaded JSON data

// Function to fetch and load the selected JSON file
function loadJsonFile(filePath) {
    return fetch(filePath)
        .then(response => response.json())
        .then(json => {
            data = json;
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}

// Function to retrieve the value from the map based on (i, j, k)
function getValue(i, j, k) {
    let key = `(${i}, ${j}, ${k})`;
    if (key in data) {
        return data[key];
    } else {
        return 0;  // Default value if the key doesn't exist
    }
}

// Event listener for the 'Go' button
document.getElementById('go-button').addEventListener('click', () => {
    let i = document.getElementById('i-value').value;
    let j = document.getElementById('j-value').value;
    let k = document.getElementById('k-value').value;
    
    if (i === "" || j === "" || k === "") {
        alert("Please enter all i, j, k values.");
        return;
    }

    let value = getValue(i, j, k);
    document.getElementById('result-value').textContent = value;
});

// Event listener for JSON file selection
document.getElementById('json-file').addEventListener('change', (event) => {
    let filePath = event.target.value;
    loadJsonFile(filePath).then(() => {
        document.getElementById('result-value').textContent = "N/A";
    });
});

// Load the default selected JSON file when the page loads
window.onload = () => {
    let defaultFile = document.getElementById('json-file').value;
    loadJsonFile(defaultFile);
};
