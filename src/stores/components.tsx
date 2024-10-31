import { create } from "zustand";

export interface InterComponent {
  id: number; //标识id
  name: string; //组件名称
  props: any; //组件属性
  children?: InterComponent[]; //子组件
  parentId?: number; //父组件id
}
interface State {
  components: InterComponent[];
  currentComponentId?:number
}
interface Action {
  addComponent: (component: InterComponent, parentId?: number) => void;
  updateComponent: (componentId: number, props: any) => void;
  deleteComponent: (componentId: number) => void;
  setCurrentComponentId:(id:number)=>void
}
// 获取节点
export const getComponent = (
  id: number,
  component: InterComponent[]
): InterComponent | null => {
  if (!id) return null;
  let resultComponent = null
  component.forEach((item) => {
    if (item.id == id) resultComponent = item;
    if (item.children && item.children.length > 0) {
      const result = getComponent(id, item.children);
      if (result) resultComponent = result
    }
  });
  return resultComponent;
};

export const useComponentsStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: 1,
      name: "Page",
      props: {}
    },
  ],
  currentComponentId:undefined,
  setCurrentComponentId:(id:number)=>{
    set({currentComponentId:id})
  },
  addComponent: (component, parentId) => {
    set((state) => {
      if (parentId) {
        let parent = getComponent(parentId, state.components);
        if (parent) {
          if (parent.children) {
            parent.children.push(component);
          } else {
            parent.children = [component];
          }
        }
        component.parentId = parentId;
        return { components: [...state.components] };
      } else {
        return { components: [...state.components, component] };
      }
    });
  },
  updateComponent(componentId, props) {
    set((state) => {
      let component = getComponent(componentId, state.components);
      if (component) {
        component.props = { ...component.props,...props };
      }
      return { components: { ...state.components } };
    });
  },
  deleteComponent(componentId) {
    if(!componentId) return
    let component = getComponent(componentId,get().components)
    if(component?.parentId){
      let parent = getComponent(component.parentId,get().components)
      if(parent){
        parent.children = parent.children?.filter(item=>item.id != componentId)
        set({components:[...get().components]})
      }
    }else{
      set((state)=>{
        return {components:state.components.filter(item=>item.id != componentId)}
      })
    }
  },
}));
