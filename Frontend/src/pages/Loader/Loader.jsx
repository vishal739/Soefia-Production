import CircularProgress from "@mui/material/CircularProgress";
import "./Loader.scss"
const Loader = () => (
  <div className="loader">
    Loading...
    <CircularProgress className="circleProgress"/>
  </div>
);
export default Loader;