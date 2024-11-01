import { useRef, useEffect, useState } from "react";
import {
  dropTargetForElements
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { useComponentsConfigStore } from "../../../stores/config";
import { useComponentsStore } from "../../../stores/components";
import { CommonComponentProps } from "../../interface";

function Page({ id,name, children }: CommonComponentProps) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { config } = useComponentsConfigStore();
  const { addComponent } = useComponentsStore();

  useEffect(() => {
    const el = ref.current;

    return dropTargetForElements({
        element: el!,
        onDragEnter: () => {
          setIsDraggedOver(true);
        },
        getData:()=>{
          return {name}
        },
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: ({location,source}) => {
          if(location.current.dropTargets[0].data.name != "Page") return
          if (source.data.name && config) {
            let newConfig = Object.values(config);
            let component = newConfig.find(
              (item) => item.name == source.data.name
            );
            if (component) {
              addComponent(
                {
                  id: new Date().getTime(),
                  name: component.name,
                  describe:component.describe,
                  props: component.defaultProps,
                },
                id
              );
            }
          }
          setIsDraggedOver(false);
        },
      });
  }, []);

  return (
    <div ref={ref} className="p-[20px] h-screen box-border">
      {children}
    </div>
  );
}

export default Page;
