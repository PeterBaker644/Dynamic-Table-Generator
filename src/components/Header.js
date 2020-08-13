import React from "react";

function Header(props) {

    return (
        <header>
            <h1 className="display-2 text-center p-2 m-4">Dynamic Table Generator</h1>
            <div className="row mx-2">
                <button className="btn btn-outline-primary col-sm-4 col-lg-2 mb-3" type="button" id="selectSeed" onClick={props.selectSeed}>Change Seed</button>
                <div className="input-group mb-3 pl-0 pl-sm-2 col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="searchSubmit"
                        value={props.formInput}
                        onChange={props.handleInputChange}
                    ></input>
                    <button className="btn btn-primary" type="button" id="searchSubmit" onClick={props.handleFormSubmit}>Search</button>
                </div>
                <button className="btn btn-outline-primary col-3 col-md-2 col-lg-1 mb-3" type="button" id="clearSubmit" onClick={props.clearForm}>Reset</button>
            </div>
        </header>
    );
}

export default Header;