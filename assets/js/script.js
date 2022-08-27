const API_KEY = "PeOIHLC_409ivMeu5OeRe2YjZPI"; // made key a variable

const API_URL = "https://ci-jshint.herokuapp.com/api"; // made url a variable

const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'))

document.getElementById('status').addEventListener('click', e => getStatus(e)); //eventlisteners for buttons
document.getElementById('submit').addEventListener('click', e => postForm(e));




async function postForm(e) { /// async function for post and get
    const form = new FormData(document.getElementById('checksform'))

    const response = await fetch(API_URL, { // add await
        method: "POST",
        headers: {
                    "Authorization": API_KEY,
                 },
                 body: form,
        })
        const data = await response.json(); //response made to json format
        if (response.ok){ //when data is reciveied 
           displayErrors(data)
        } else {
            throw new Error(data.error)
        }
}       
function displayErrors(data){ //display error
    let heading = `JSHint Results for ${data.file}}`
    if(data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>` //the count of errors
        
        for(let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `; //message line with col and line
            results += `column <span class="column">${error.col}:</span></div>`;
            results += `<div class="error">${error.error}</div>`; //the actual error
        }
    }
        document.getElementById('resultsModalTitle').innerHTML = heading; //manipulating dom
        document.getElementById('results-content').innerHTML = results;     //manipulating dom

        resultsModal.show();
}

async function getStatus(e) {//get function to se if key is ok
    const queryString = `${API_URL}?api_key=${API_KEY}`

    const response = await fetch(queryString); //add await

    const data = await response.json(); //response to json and into const data

    if(response.ok) {
       displayStatus(data); // respons is displayed or else error info is messaged
    } else {
        throw new Error(data.error);
    }
}
    function displayStatus(data) {

        let heading = 'API Key Status'
        let results = `<div>Your key is valid until</div>`
        results += `<div class="key-status">${data.expiry}</div>`

        document.getElementById('resultsModalTitle').innerHTML = heading;
        document.getElementById('results-content').innerHTML = results;

        resultsModal.show();
}