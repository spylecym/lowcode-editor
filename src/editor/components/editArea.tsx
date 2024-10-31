import {createElement,useState} from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentsConfigStore } from "../../stores/config";
import {type InterComponent} from '../../stores/components'
import {HoverMasker} from './hoverMasker'

function EditArea(){
  const { components } = useComponentsStore();
  const {config} = useComponentsConfigStore()
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const renderComponents = (components:InterComponent[]): React.ReactNode=>{
    return components.map(item=>{
      const componentConfig = config[item.name]
      if(!componentConfig) return null
      return createElement(
        componentConfig.component,
        {
          key:item.id,
          id:item.id,
          name:item.name,
          ...componentConfig.defaultProps,
          ...item.props
        },
        renderComponents(item.children||[])
      )
    })
  }
  const handleMouseOver = (e:any)=>{
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
        const ele = path[i] as HTMLElement;

        const componentId = ele.dataset?.componentId;
        if (componentId) {
            setHoverComponentId(+componentId);
            return;
        }
    }
  }
  return (
    <div className="edit-wrapper" onMouseOver={handleMouseOver} onMouseOut={()=>setHoverComponentId(undefined)}>
      <div>{renderComponents(components)}</div>
      {hoverComponentId && <HoverMasker componentId={hoverComponentId} wrapperClassName="edit-wrapper"/>}
    </div>
  );
}
export default EditArea;