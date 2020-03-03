import { readFileSync } from "fs"
import { Surface, Text, ZoomedImg } from "./circuits-components/core/ui"
import { featureVis } from "./circuits-components/core/helpers"
import Article from "./circuits-components/core/article"
import TOC from "./circuits-components/zoomIn/toc"
import Curves from "./circuits-components/zoomIn/curves"
import HighLow from "./circuits-components/zoomIn/highLow"
import PoseDog from "./circuits-components/zoomIn/poseDog"
import DogOrientation from "./circuits-components/zoomIn/dogOrientation"
import Superposition from "./circuits-components/zoomIn/superposition"
import Weights1 from "./circuits-components/curveCircuit/weights1"
import CurveWeights2 from "./circuits-components/curveCircuit/curveWeights2"
import CurveCircuit from "./circuits-components/zoomIn/curveCircuit"
import OrientedDogHeads from "./circuits-components/zoomIn/orientedDogs"
import Polysemantic from "./circuits-components/zoomIn/polysemantic"
import React from "react"
import Banner from "./circuits-components/core/banner"

const article = readFileSync(__dirname + "/article.md", "utf-8")

export class Header extends React.Component {
  render() {
    return (
      <Surface gridColumn="screen" alignItems="center" marginTop={20}>
        <Banner title="Zoom In" subtitle="An introduction to Circuits" />
      </Surface>
    )
  }
}

class CurvesAcrossModels extends React.Component {
  render() {
    // const inceptionNeurons = [379, 406, 385, 343, 342, 388, 340, 330, 349, 324]
    const inceptionNeurons = [385, 379, 330, 342, 343]
    const alexnetNeurons = [348, 253, 277, 319, 282]

    return (
      <Surface
        gridColumn="screen"
        alignItems="center"
        marginY={20}
        paddingY={10}
      >
        <Surface flexFlow="row">
          <Text
            color="#222"
            size={600}
            width={100}
            marginRight={10}
            marginTop={20}
          >
            InceptionV1
          </Text>
          <Surface flexFlow="row" flexWrap="wrap">
            {inceptionNeurons.map(neuron => (
              <Surface margin={10}>
                <ZoomedImg
                  size={80}
                  src={featureVis("inceptionv1", "mixed3b", neuron)}
                />
              </Surface>
            ))}
          </Surface>
        </Surface>
        <Surface flexFlow="row">
          <Text
            color="#222"
            size={600}
            width={100}
            marginRight={10}
            marginTop={20}
          >
            AlexNet
          </Text>
          <Surface flexFlow="row" flexWrap="wrap">
            {alexnetNeurons.map(neuron => (
              <Surface margin={10}>
                <ZoomedImg
                  size={80}
                  src={featureVis("alexnet", "conv3_1", neuron)}
                />
              </Surface>
            ))}
          </Surface>
        </Surface>
      </Surface>
    )
  }
}

export class Content extends React.Component {
  render() {
    const figures = {
      TOC,
      Curves,
      CurvesAcrossModels,
      CurveCircuit,
      HighLow,
      Polysemantic,
      DogOrientation,
      PoseDog,
      CurveWeights2: () => <CurveWeights2 includeNegativeWeights={false} />,
      Weights1,
      Superposition,
      OrientedDogHeads,
      deepdream: () => (
          <figure class="l-body-outset">
            <img src={require("./static/deepdream.png")} />
            <figcaption>
              DeepDream hints at a rich world of visual features inside modern
              vision models.
            </figcaption>
          </figure>
      ),
      schwann: () => (
        <figure class="l-body-outset">
          <img src={require("./static/schwann.png")} width={700} />
        </figure>
      ),
      micrographia: () => (
          <figure class="l-body-outset">
            <img src={require("./static/micrographia.png")} />
            <figcaption>
              Hooke’s Micrographia revealed a rich microscopic world as seen
              through a microscope, including the initial discovery of cells.
              <br />Images from the National Library of Wales.
            </figcaption>
          </figure>
      ),
    }

    return (
      <React.Fragment>
        <Article
          markdown={article}
          figures={figures}
          next={{
            title: "Curve Detectors",
            href: "https://drafts.distill.pub/circuits--curve-detectors/",
          }}
        />
      </React.Fragment>
    )
  }
}
