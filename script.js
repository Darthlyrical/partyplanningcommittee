//state variables

let parties;
let selectedParty;
const API = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api'
const cohort = '/2511-FTB-CT-WEB-PT'
const segment = '/events'





//async functions
async function getList() {
    try {
        const response = await fetch(API + cohort + segment);

        // console.log(response);
        

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();
        // console.log('API',result)

        parties = result.data;


    } catch (error) {
        console.error('getList:', error);
    }
}

async function getParty(id) {
    try {
        const response = await fetch(`${API}${cohort}${segment}/${id}`);

        if(!response.ok){
            throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();
        selectedParty = result.data
        render();
    } catch (error) {
        console.error('getParty', error)
    }
    
}


//functions for building out components
function Title() {

    const $section = document.createElement('div');

    $section.className = 'topper'
    //variable to manipulate h1 tag
    const $Title = document.createElement('h1');
    //adding text into the tag
    $Title.textContent = 'Party Planning Committee';

    //variable to manipulate the div tag
    const $quote = document.createElement('div');
    //adds class to div tag so I can style easier
    $quote.className = 'quote';
    //adds text to div. Might randomly generate office quotes later
    $quote.textContent = '"I think green is whore-ish" - Angela Martin';

    $Title.appendChild($quote)


    //appends the quote to the Title
    $section.append($Title)
    
    //returns the completed container
    return $section;
}

function LeftBox() {
    const $section = document.createElement('section');
    const $header = document.createElement('h2');
    const $listContainer = document.createElement('div');

    $header.textContent = 'Upcoming Parties';

    $listContainer.append(PartyList());
    $section.append($header, $listContainer)

    return $section
}

function RightBox() {

    const $section = document.createElement('section');
    const $header = document.createElement('h2');

    $header.textContent = 'Party Details';

    $section.append($header, PartyDetails())

    return $section

}


function PartyListDetails(party) {
    const $li = document.createElement('li');
    $li.textContent = party.name;

    $li.addEventListener('click', () => {
        getParty(party.id);
        render();
    })
    return $li;
}

function PartyList() {
    const $ul = document.createElement('ul');
    $ul.className = 'parties-list'
    if (!parties) return $ul;

    const $items = parties.map(PartyListDetails);

    $ul.replaceChildren(...$items);

    return $ul;
}

function PartyDetails() {
    const $div = document.createElement('div');

    if(!selectedParty) {
        $div.textContent = 'Select a party from the list to learn more.';
        return $div;
    }
    
    const dateString = new Date(selectedParty.date).toLocaleString();

    $div.innerHTML = `
        <h3>${selectedParty.name} #${selectedParty.id}</h3>
        <p>${dateString}</p>
        <p>${selectedParty.location}</p>
        <p>${selectedParty.description}</p>`;

        return $div
}




//Rendering
function render() {

    const $app = document.querySelector('#app');

    $app.innerHTML = '';

    const $main = document.createElement('div');
    $main.className = 'main-layout';

    $main.append(LeftBox(), RightBox());

    $app.append(Title(), $main);


}

async function init() {
    await getList();
    render();
}

init();


