const firstUrl = 'https://swapi.co/api/people';
let nextUrl = '';

function createPage(baseUrl) {

    function getJson(url) {
        return fetch(url).then((response) => {
            //console.log(response);
            return response.json();
        });
    }

    let peopleList = getJson(baseUrl);

    peopleList.then((people) => {
        console.log(people);
        createPeopleTable(people);
        nextUrl = people.next;
    });

    function createPeopleTable(people) {
        const tableElement = document.getElementById('table');
        tableElement.innerHTML = '';
        const tableHead = document.createElement('tr');
        tableHead.innerHTML = `
    <th>Name</th>
    <th>Height</th>
    <th>Hair Color</th>`;
        tableElement.appendChild(tableHead);

        console.log(people.results[0]);

        people.results.forEach(person => {
            tableElement.appendChild(createTableRow(person));
        });
        //tableElement.appendChild(createTableRow(people.results[0]));
        //createNavigation(people);
    }

    function createTableRow(person) {
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${person.name}</td>
    <td>${person.height}</td>
    <td>${person.hair_color}</td>`;

        return row;
    }
}

function getNextPage() {
    //const nextTag = document.getElementById('next');
    //const nextUrl = ;
    createPage(nextUrl);
}

window.addEventListener('load', () => {
    createPage(firstUrl);
})