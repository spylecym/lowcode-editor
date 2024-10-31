import { Allotment } from "allotment";
import "allotment/dist/style.css";

import Header from "./components/header.tsx";
import Materail from "./components/materail.tsx";
import EditArea from "./components/editArea.tsx";
import Setting from "./components/setting.tsx";

function LowerCodeEditor() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Materail />
        </Allotment.Pane>
        <Allotment.Pane minSize={700}><EditArea/></Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
export default LowerCodeEditor;
