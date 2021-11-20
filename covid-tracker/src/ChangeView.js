import { useMap} from "react-use";
import { useLeaflet} from "react";

function ChangeView({ center, zoom }) {
    const { map } = useLeaflet();
    // const map = useMap();
    //console.log('map center:', map.getCenter())
    map.setView(center, zoom);
   
  return null;
}

export default ChangeView;