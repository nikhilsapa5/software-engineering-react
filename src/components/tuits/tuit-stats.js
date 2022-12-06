import React, {useState, useEffect} from "react";
import * as service from "../../services/likes-service";

const TuitStats = ({
                       tuit, likeTuit = () => {
    }
                   }) => {
    const [isLikedByMe, setLikeTuit] = useState(false);
    const isTuitLikedByMe = () =>
        service.tuitLikedByMe('me', tuit._id)
            .then((like) => {
                if (like) {
                    setLikeTuit(true);
                } else {
                    setLikeTuit(false);
                }
            })

    useEffect(isTuitLikedByMe);
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span onClick={() => likeTuit(tuit)}>
              {
                  isLikedByMe &&
                  <i className="fa-solid fa-thumbs-up me-1" style={{color: 'blue'}}/>
              }
                    {
                        !isLikedByMe &&
                        <i className="fa-light fa-thumbs-up me-1"/>
                    }
                    {tuit.stats && tuit.stats.likes}
            </span>
            </div>

            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;