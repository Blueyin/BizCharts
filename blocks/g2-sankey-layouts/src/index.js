import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import data from "./mock.json";

class Sankeylayouts extends React.Component {
  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: "graph",
      edges: d => d.links
    });
    dv.transform({
      type: "diagram.sankey"
    });
    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };
    return (
      <div>
        <Chart
          forceFit={true}
          data={[1]}
          height={window.innerHeight}
          scale={scale}
          padding={[40, 80]}
        >
          <Tooltip showTitle={false} />
          <View data={dv.edges}>
            <Geom
              type="edge"
              position="x*y"
              shape="arc"
              color="#bbb"
              opacity={0.6}
              tooltip={
                ("target*source*value",
                (target, source, value) => {
                  return {
                    name: source.name + " to " + target.name + "</span>",
                    value
                  };
                })
              }
            />
          </View>
          <View data={dv.nodes}>
            <Geom
              type="polygon"
              position="x*y"
              color="name"
              style={{
                stroke: "#ccc"
              }}
            >
              <Label
                content="name"
                textStyle={{
                  fill: "#545454",
                  textAlign: "start"
                }}
                offset={0}
                formatter={val => {
                  return "  " + val;
                }}
              />
            </Geom>
          </View>
        </Chart>
      </div>
    );
  }
}

export default Sankeylayouts;