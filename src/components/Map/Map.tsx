import * as React from "react";
import styled from "styled-components";

import { MapHeader,MapList,AddMapButton } from "./index";

const Map = () => {
 
  return (
    <MapLayout>
        <AddMapButton/>
        <MapHeader/>
        <MapList/>
    </MapLayout>
  );
};

const MapLayout = styled.div`
  width: 99.9vw;
  height: 60vh;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Map;
