import { Button as AntdButton } from 'antd';
import { ButtonType } from 'antd/es/button';
interface ButtonProps {
  text: string,
  type:ButtonType
}
const Button = ({text,type}:ButtonProps) => {
  return <AntdButton type={type}>{text}</AntdButton>
}
export default Button