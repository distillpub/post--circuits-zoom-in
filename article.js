import { readFileSync } from "fs"
import { Surface, Text, ZoomedImg } from "./circuits-components/core/ui"
import { featureVis } from "./circuits-components/core/helpers"
import Article from "./circuits-components/core/article"
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
        background="rgb(23,18,72)"
      >
        <Surface flexFlow="row">
          <Text color="white" width={100} marginTop={20}>
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
          <Text color="white" width={100} marginTop={20}>
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
    const images = {
      micrographia: "/micrographia.png",
      schwann: "/schwann.png",
      deepdream: "/deepdream.png",
      dataset: "/dataset.png",
      curves: "/curves.png",
      curveWeights: "/curve-weights.png",
      curveOrientation: "/curve-orientations.png",
      polysemantic: "/polysemantic.png",
      dogCircuit: "/dog-circuit.png",
      curvesAcrossModels: "/curves-across-models.png",
      // curveWeights: require("./curve-weights.png"),
      curveOrientations: "/curve-orientations.png",
      curveCircuit: "/curve-circuit.png",
      orientedDogHeads: "/oriented-dog-heads.png",
      dogCircuit: "/dog-circuit.png",
      superposition: "/superposition.png",
      freq: "/freq.png",
    }

    const figures = {
      CurvesAcrossModels,
    }

    Object.keys(images).forEach(key => {
      figures[key] = () => (
        <Surface
          gridColumn="screen"
          alignItems="center"
          marginY={20}
          paddingY={10}
          background="rgb(23,18,72)"
        >
          <div>
            <img src={images[key]} width={700} />
          </div>
        </Surface>
      )
    })

    return (
      <React.Fragment>
        <Article
          markdown={article}
          figures={figures}
          images={images}
          next={{
            title: "Curve Detectors",
            href: "https://drafts.distill.pub/circuits--curve-detectors/",
          }}
        />
      </React.Fragment>
    )
  }
}
