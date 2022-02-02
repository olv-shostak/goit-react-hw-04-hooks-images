import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoSearch } from "react-icons/go";

class Searchbar extends Component {
  state = {
    value: "",
  };

  handleTextChange = (e) => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.value.trim() === "") {
      return toast.warning("Please, enter a request");
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <GoSearch  width="50"/>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleTextChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
