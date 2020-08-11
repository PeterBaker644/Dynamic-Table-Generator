import React, { Component } from "react";
import Table from "./Table";
import Caret from "./icons/Caret"
import dataJSON from "../seed.json"
import "./table.css";

class TableContainer extends Component {
    // State variables are VERY case sensitive!
    state = {
        sortBy: "id",
        sortOrder: "asc",
        filterBy: "",
        formInput: ""
    };

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({
            formInput: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.formInput) {
            this.setState({
                filterBy: this.state.formInput,
                formInput: ""
            });
        } else {
            // some kind of warning. 
        }
    };

    clearForm() {
        this.setState({
            formInput: "",
            filterBy: ""
        });
    }

    superSorter(key, order = 'asc') {
        // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    configureList() {
        // Consider splitting "Name" into first and last for easy sorting.
        const employeeArray = (Object.values(dataJSON));
        const employeesFiltered = [];
        for (const item of employeeArray) {
            if (Object.values(item).includes(this.state.filterBy) || !this.state.filterBy) employeesFiltered.push(item);
        }
        //Unnecessary execution ^ 
        //Consider somehow only re-rendering the table if employeesFiltered != "";
        const employeesSorted = employeesFiltered.sort(this.superSorter(this.state.sortBy, this.state.sortOrder));
        return (employeesSorted);
    }

    sortButton(thisSortBy) {
        if (thisSortBy === this.state.sortBy) {
            console.log(`Already sorting by ${thisSortBy}!`);
            console.log(this.state.sortOrder);
            if (this.state.sortOrder === "asc") {
                this.setState({sortOrder: "desc"});
            } else {
                this.setState({sortOrder: "asc"});
            }
        } else {
            this.setState({
                sortOrder: "asc",
                sortBy: thisSortBy
            });
        }
    }

    iconPicker(thisSortBy) {
        if (this.state.sortBy === thisSortBy && this.state.sortOrder === "asc") {
            console.log("caretDownFilled");
            return "caretDownFill"
        } else if (thisSortBy === this.state.sortBy) {
            console.log("caretUpFilled");
            return "caretUpFill"
        } else {
            console.log("caretDown");
            return "caretDown"
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-1 text-center p-2 m-4">Employee Directory</h1>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search Employees" 
                        aria-label="Search Employees" 
                        aria-describedby="searchSubmit"
                        value={this.state.formInput}
                        onChange={this.handleInputChange}
                    ></input>
                    <button className="btn btn-primary" type="button" id="searchSubmit" onClick={this.handleFormSubmit}>Search</button>
                    <button class="btn btn-outline-primary" type="button" id="clearSubmit" onClick={()=> this.setState({ formInput: "", filterBy: "" })}>Reset</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <button 
                                    type="button" 
                                    className="btn btn-sm filter-button"
                                    onClick={() => this.sortButton("id")}
                                >
                                    <span className="table-header">#</span>
                                    <Caret type={this.iconPicker("id")}/>
                                </button>
                            </th>
                            <th scope="col">
                                <button 
                                    type="button" 
                                    className="btn btn-sm filter-button"
                                    onClick={() => this.sortButton("Name")}
                                >
                                    <span className="table-header">Name</span>
                                    <Caret type={this.iconPicker("Name")}/>
                                </button>
                            </th>
                            <th scope="col">
                                <button 
                                    type="button" 
                                    className="btn btn-sm filter-button"
                                    onClick={() => this.sortButton("Role")}
                                >
                                    <span className="table-header">Role</span>
                                    <Caret type={this.iconPicker("Role")}/>
                                </button>
                            </th>
                            <th scope="col">
                                <button 
                                    type="button" 
                                    className="btn btn-sm filter-button"
                                    onClick={() => this.sortButton("Department")}
                                >
                                    <span className="table-header">Department</span>
                                    <Caret type={this.iconPicker("Department")}/>
                                </button>
                            </th>
                            <th scope="col">
                                <button 
                                    type="button" 
                                    className="btn btn-sm filter-button"
                                    onClick={() => this.sortButton("Salary")}
                                >
                                    <span className="table-header">Salary</span>
                                    <Caret type={this.iconPicker("Salary")}/>
                                </button>
                            </th>
                            <th scope="col">
                                <button 
                                    type="button" 
                                    className="btn btn-sm filter-button"
                                    onClick={() => this.sortButton("Manager")}
                                >
                                    <span className="table-header">Manager</span>
                                    <Caret type={this.iconPicker("Manager")}/>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <Table employee={this.configureList()} />
                </table>
            </div>
        )
    }
}

export default TableContainer;
