import React from "react";
import { useComponentsStore } from "../../stores/components";
import { useComponentsConfigStore } from "../../stores/config";
import {type InterComponent} from '../../stores/components'
function EditArea(){
  const { components } = useComponentsStore();
  const {config} = useComponentsConfigStore()

  const renderComponents = (components:InterComponent[]): React.ReactNode=>{
    return components.map(item=>{
      const componentConfig = config[item.name]
      if(!componentConfig) return null
      return React.createElement(
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
  return (
    <div>
      <h1>编辑区域</h1>
      <div>{renderComponents(components)}</div>
    </div>
  );
}
export default EditArea;