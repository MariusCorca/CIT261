import hikeModel from './hikeModel.js';
import hikeView from './hikeView.js';

export default class hikeController {
    constructor(hikeID) {
        this.hikeModel = new hikeModel();
        this.hikeList = this.hikeModel.getHikes();
        this.imgBasePath = this.hikeModel.getImgPath();
        this.hikeID = hikeID;
        this.hikeView = new hikeView(this.hikeList, this.imgBasePath, this.hikeID);
    }
    
    renderHikes() {
        this.hikeView.renderHikeList();
    }
}
