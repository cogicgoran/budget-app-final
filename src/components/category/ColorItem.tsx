interface Props {
  color: string;
  borderColor: string;
}

function ColorItem({ color, borderColor }: Props) {
  const styleObj = {
    backgroundColor: color,
    borderColor: borderColor,
    width: "21px",
    height: "60px",
  };
  return <div style={styleObj} className="js-color-item"></div>;
}

export default ColorItem;
