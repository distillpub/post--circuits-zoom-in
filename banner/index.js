import Figure from "~/components/figure"
import circuit1 from "./circuit1"

export default class Banner extends Component {
  state = {}

  render() {
    const iconSize = 35
    const figureHeight = 140

    const Section = ({ claim, title, children }) => (
      <Surface marginY={7} overflow="hidden" borderRadius={6}>
        <Surface flexFlow="row" paddingX={20}>
          <Surface alignSelf="center">
            <Surface flexFlow="row" paddingBottom={10} alignItems="center">
              <Surface
                marginRight={10}
                borderRadius={iconSize}
                alignItems="center"
                justifyContent="center"
                background="white"
                width={iconSize}
                height={iconSize}
                border
              >
                <Text fontSize={16} fontWeight={700}>
                  {claim}
                </Text>
              </Surface>
              <Text size={600} fontWeight="bold">
                {title}
              </Text>
            </Surface>

            <Surface>{children}</Surface>
          </Surface>
        </Surface>
      </Surface>
    )

    const sectionFontSize = 18

    return (
      <React.Fragment>
        <Surface width={"100%"} flexFlow="row" justifyContent="space-between">
          <Surface>
            <Section title="Neurons learn meaningful features" claim={1}>
              <Text fontSize={sectionFontSize}></Text>
            </Section>
            <Surface alignItems="center" marginTop={0}>
              <Surface
                height={figureHeight}
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  src={neuronFeatureVis("inceptionv1", "mixed4c", 447)}
                  width={110}
                  style={{ borderRadius: 5 }}
                />
              </Surface>
              <Text size={600} fontWeight={400} marginTop={10}>
                A car neuron
              </Text>
            </Surface>
          </Surface>
          <Surface>
            <Section
              title="Their connections form interpretable circuits"
              claim={2}
            />
            <Surface alignItems="center">
              <Surface
                height={figureHeight}
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <img width={230} src={require("./circuit1.png")} />
              </Surface>
              <Text size={600} fontWeight={400} marginTop={10}>
                Is built from a car body and tires
              </Text>
            </Surface>
          </Surface>
          <Surface>
            <Section title="Circuits recur across models and tasks" claim={3} />
            <Surface alignItems="center">
              <Surface
                height={figureHeight}
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <img width={230} src={require("./circuit1.png")} />
              </Surface>
              <Text size={600} fontWeight={400} marginTop={10}>
                Across different models
              </Text>
            </Surface>
          </Surface>
        </Surface>
      </React.Fragment>
    )
  }
}
