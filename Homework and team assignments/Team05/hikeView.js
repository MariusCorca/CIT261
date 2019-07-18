export default class hikeView {
    constructor(hikeList, imgBasePath, hikeID) {
        this.hikeList = hikeList;
        this.imgBasePath = imgBasePath;
        this.hikeID = hikeID;
    }

    renderHikeLight(hike) {
        const item = document.createElement('li');

        item.innerHTML = ` <h2>${hike.name}</h2>
        <div class="image"><img src="${this.imgBasePath}${hike.imgSrc}" alt="${
          hike.imgAlt
        }"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
        </div>`;

        return item;
    }

    renderHikeList() {
        const hikeListElement = document.getElementById(this.hikeID);
        hikeListElement.innerHTML = '';
        this.hikeList.forEach(hike => {
            hikeListElement.appendChild(this.renderHikeLight(hike));
        });
    }


}

