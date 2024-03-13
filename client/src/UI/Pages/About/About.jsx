import React from "react";
import "./About.scss";

import Gym from "../../../images/gym.jpg";
import Equipment from "../../../images/equipment.jpg";

const About = () => {
  return (
    <div className="about">
      <h2>Fitness Store</h2>
      <div className="text">
        <p>
          Lorem ipsum dolor sit amet consectetur. Quam consectetur urna
          adipiscing facilisis. Ut potenti ipsum at dignissim donec non vivamus.
          Sed libero vel arcu elementum vitae.
        </p>
        <p>
          Eget ullamcorper faucibus sagittis odio et turpis nunc nulla mi. Vel
          mauris rhoncus viverra morbi aliquet gravida dolor. Neque sit leo at
          volutpat. Faucibus varius arcu dolor eu volutpat. Ut praesent vitae
          diam in ultricies ornare ante amet. Auctor congue nulla curabitur
          parturient. Lacus ac adipiscing blandit pellentesque. Nisl blandit
          volutpat ornare nibh eget. Sit congue consequat integer integer. Amet
          aliquet proin fermentum porttitor.
        </p>
        <p>
          Tortor rhoncus proin auctor ultrices aenean montes aliquet tortor
          vehicula. Nec varius vestibulum posuere egestas aenean facilisis
          gravida. In hendrerit faucibus leo massa volutpat euismod ultricies.
          Lorem neque a viverra ut. Dui nisl amet vestibulum enim at metus
          massa. Facilisi in ipsum ipsum purus etiam nunc est neque. Praesent
          magna libero facilisi volutpat condimentum placerat tempus non.
          Gravida lacinia diam sit aliquam justo sed tortor eget amet. Morbi
          auctor purus sem cursus lectus est blandit faucibus. A convallis
          consequat duis pharetra amet nec. Tellus quisque justo adipiscing
          tellus diam in. Suspendisse pharetra tortor donec sed. Euismod sit
          dictum est sed id iaculis. Felis elit nunc etiam nunc. Fermentum
          porttitor ultrices odio cursus morbi donec lobortis malesuada quisque.
        </p>
        <p>
          Augue nulla eget ac suspendisse et. Mattis amet imperdiet interdum
          aliquet mauris gravida fermentum. Nunc augue pharetra nunc aliquet.
        </p>
      </div>

      <div className="images">
        <img src={Gym} alt="Exercise Equipment" />
        <img src={Equipment} alt="Exercise Equipment" />
      </div>
    </div>
  );
};

export default About;
