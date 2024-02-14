import React from "react";

function TeamPhotos() {
    const teamPhotos = ["derek.png", "ian.png", "jonh.png", "luke.png", "mike.png", "sara.png"];

    return (
        <div className="team-photos-container">
            {teamPhotos.map((photo, index) => {
                let imagePath = `/images/employees/${photo}`
                let imageAlt = `${photo.substring(0, photo.lastIndexOf('.'))} profile photo`
                return <img key={index} className="team-member-photo" src={imagePath} alt={imageAlt} />
            })}
        </div>
    );
}

export default TeamPhotos;
