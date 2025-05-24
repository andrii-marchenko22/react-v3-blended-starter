// import { ClimbingBoxLoader } from "react-spinners";
import style from "./Loader.module.css";

import { Audio } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <Audio height="80" width="80" color="green" ariaLabel="loading" />
    </div>
  );
}
