import { useRef,useEffect,useState } from "react";
import {
  dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useComponentsConfigStore } from "../../../stores/config";
import { useComponentsStore } from "../../../stores/components";
import {CommonComponentProps} from '../../interface'
import clsx from "clsx";

const Container = ({id,name,children}:CommonComponentProps) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const { config } = useComponentsConfigStore();
  const { addComponent } = useComponentsStore();
  
  useEffect(() => {
    const el = ref.current;

    return dropTargetForElements({
        element: el!,
        onDragEnter: () => {
          setIsDraggedOver(true)
        },
        getData:()=>{
          return {name}
        },
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: ({location,source}) => {
          if((location.current.dropTargets[0].element as HTMLElement).dataset.componentId != id+'') return
          if(source.data.name && config){
            let newConfig = Object.values(config)
            let component = newConfig.find(item=>item.name==source.data.name)
            if(component){
              addComponent({
                id:new Date().getTime(),
                name:component.name,
                describe:component.describe,
                props:component.defaultProps
              },id)
            }
          }
          setIsDraggedOver(false)
        },
    });
}, []);
  return <div ref={ref} data-component-id={id} className={clsx('min-h-[100px] p-[20px]',isDraggedOver?"border-dashed border-[1px] border-blue-500":'border-[1px] border-[#000]')}>{children}</div>
}
export default Container