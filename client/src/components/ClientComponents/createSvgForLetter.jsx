const createSvgForLetter = (letter) => {
  return (
    <svg width="40" height="40" className="svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#000" />
      <text
        x="50%"
        y="39%"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fill="white"
        fontFamily="Arial"
        dy=".3em"
      >
        {letter.toUpperCase()}
      </text>
    </svg>
  );
};

export default createSvgForLetter;
