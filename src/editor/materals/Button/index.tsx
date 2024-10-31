import { Button as AntdButton } from 'antd';
import {CommonComponentProps} from '../../interface'

const Button = ({text,type,id}:CommonComponentProps) => {
  return <AntdButton data-component-id={id} type={type}>{text}</AntdButton>
}
export default Button