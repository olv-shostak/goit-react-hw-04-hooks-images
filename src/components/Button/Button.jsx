const Button = ({ pagination }) => {
  return (
      <button type="button" className="Button" onClick={pagination}>
        Load more
      </button>
  );
};

export default Button;