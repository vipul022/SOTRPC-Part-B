import React from "react";
import Container from "react-bootstrap/Container";
import history11 from "../../data/images/history/history11.jpg";
import history4 from "../../data/images/history/history4.jpg";
import history15 from "../../data/images/history/history15.jpg";
import history7 from "../../data/images/history/history7.jpg";
import history17 from "../../data/images/history/history17.jpg";
import history10 from "../../data/images/history/history10.jpg";
import { Image, Media } from "react-bootstrap";
import Header from "../Header/Header";

const History = ({ history }) => {
  return (
    <Container className="main-container">
      <Header history={history}>History</Header>

      <Container className="history-container">
        <Image
          className="history-image-center"
          src={history11}
          alt="Pottery club building circa 1971"
        />
        <Media>
          <Image className="history-image-left" src={history10} alt="" />
          <Media.Body>
            <h5>The Early Days</h5>
            <p>
              The South of the River Potters’ Club was established in 1974 and
              initially occupied premises in the Richmond Shopping Centre on
              Canning Highway, East Fremantle. The first AGM was held on January
              29th, 1975 and the Treasurer reported that the Club had $41 in the
              bank. An electric kiln was purchased for $200 and by April it had
              been installed and plans were underway for the Club’s first
              Mother’s Day Sale which raised $525 in sales.
            </p>
            <p>
              At its high point the Club had a membership of 100 with a waiting
              list, a reflection of the popularity of pottery in the ‘70s and
              ‘80s.
            </p>
          </Media.Body>
        </Media>
        <Media>
          <Media.Body>
            <h5>Silas Street</h5>
            <p>
              After several years in the little shop front on Canning Highway
              the Club moved to new premises at 12 Silas Street where it became
              a local landmark for many years. The facilities were expanded with
              the addition of a new kiln shed and new kilns and a large workroom
              which was the focus of many workshops and exhibitions. The Club
              shop was open on weekends and business was good, particularly at
              the annual Mother’s Day and Christmas sales.
            </p>
          </Media.Body>
          <Image
            className="history-image-right"
            src={history7}
            alt="Mothers Day newspaper article"
          />
        </Media>
        <Media>
          <Image
            className="history-image-left"
            src={history4}
            alt="Mothers Day newspaper article"
          />
          <Media.Body>
            <h5>O’Connor</h5>
            <p>
              After 22 years the Club had to leave Silas Street and temporarily
              relocated to a factory unit in O’Connor. Negotiations were started
              with the Melville Community Arts Association with the aim of
              finding the SORPC a permanent home at the Atwell House arts centre
              on Canning Highway in Alfred Cove. Despite some resistance from
              within the Atwell community, the potters were allowed to establish
              themselves in the work shed and kiln room that they have occupied
              since that time.
            </p>
          </Media.Body>
        </Media>
        <Media>
          <Media.Body>
            <h5>Over the years</h5>
            <p>
              Over the years the Club has regularly participated in community
              events such as the annual Craft Show at Claremont Showgrounds, the
              Empty Bowls fundraising event and the City of Melville Art Trail
              and many art exhibitions in Atwell Gallery. In 2018 the Club
              celebrated its 42nd anniversary with a spectacular retrospective
              exhibition featuring work by early members and a reunion of many
              of the original members.
            </p>
          </Media.Body>
          <Image
            className="history-image-right"
            src={history15}
            alt="Mothers Day newspaper article"
          />
        </Media>
        <Media>
          <Image
            className="history-image-left"
            src={history17}
            alt="Mothers Day newspaper article"
          />
          <Media.Body>
            <h5>A new era</h5>
            <p>
              In 2017 it became evident that the Club sheds had been erroneously
              located on the adjacent block and would need to be moved. So,
              after many years in these limited facilities with no running water
              or air-conditioning and inadequate space for larger gatherings and
              workshops, lobbying of the City of Melville began with the aim of
              creating a new, purpose-built, ceramics studio on the Atwell House
              site. As of December 2020, the projection is that construction of
              the new studio facility should be complete before the end of 2021.
              It will certainly be the start of a new era for the South of the
              River Potters’ Club.
            </p>
          </Media.Body>
        </Media>
      </Container>
    </Container>
  );
};
export default History;
