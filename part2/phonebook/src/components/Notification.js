const Notification = ({ message }) => {
  const messageStyle = {
    border: "2px solid green",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '25%',
    background: "#D3D3D3",
    color: "green",
    fontSize: 18,
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={messageStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
