const letters = ["L", "O", "A", "D", "I", "N", "G"];

const LoadingNotes = () => {
  return (
    <div className="flex items-center justify-center gap-3 py-14">
      {letters.map((char, index) => (
        <div className="loader" key={index}>
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64" />
            <text x="50%" y="60%" textAnchor="middle" className="loader-text">
              {char}
            </text>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default LoadingNotes;
