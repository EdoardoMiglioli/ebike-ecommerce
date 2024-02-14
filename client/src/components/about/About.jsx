import React from "react";
import Paragraph from "./Paragraph";
import TeamPhotos from "./TeamPhotos";

function About() {
    let visionText = `ElectroVolt envisions a world where electric mobility is the norm, 
                    leading to cleaner air, reduced carbon emissions, and enhanced sustainability. 
                    We aim to be at the forefront of this movement, driving technological advancements 
                    and societal shifts towards a future where electric vehicles play a central role in transportation, 
                    contributing to a healthier planet for generations to come.`;

    let missionText = `ElectroVolt is committed to revolutionizing transportation by offering cutting-edge electric mobility solutions. 
                    Our mission is to empower individuals and communities with eco-friendly alternatives, reducing carbon emissions and promoting sustainable living. 
                    Through innovation, reliability, and accessibility, we strive to make electric transportation a mainstream choice, fostering a cleaner, greener future for all.`;

    return (
        <main>
            <TeamPhotos />
            <section>
                <Paragraph title="Vision" text={visionText} />
                <Paragraph title="Mission" text={missionText} />
            </section>
        </main>
    );
}

export default About;
