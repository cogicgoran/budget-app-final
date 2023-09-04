interface Props {
  message: string;
}

function ErrorInput({ message }: Props) {
  return <p style={{ margin: 0, color: "red" }}>{message}</p>;
}

export default ErrorInput;
