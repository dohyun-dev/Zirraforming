const ProgressBar = (props) => {
  const { bgcolor, completed, left } = props;

  const containerStyles = {
    height: 20,
    width: '80%',
    backgroundColor: "#e0e0de",
    // borderRadius: 50,
    margin: "7vh 0px 3vh 0px",
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <div>
          <span style={labelStyles}>
            <img
            src="/assets/styleQuiz/bar.png"
            style={{
              width: "70px",
              position: "absolute",
              marginLeft: "0px",
              top: "33px",
              left: 15 + (left * 40),
            }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;