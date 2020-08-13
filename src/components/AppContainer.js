import React, { Component } from "react";
import Header from "./Header";
import TableHeader from "./TableHeader";
import TableHeaderButton from "./TableHeaderButton";
import TableBody from "./TableBody";
import Caret from "./icons/Caret";
import employees from "../seedEmployees.json";
import students from "../seedStudents.json";
import "./style.css";

class AppContainer extends Component {
    // State variables are VERY case sensitive!
    state = {
        sortBy: "id",
        sortOrder: "asc",
        filterBy: "",
        formInput: "",
        seed: employees
    };

    selectSeed = event => {
        event.preventDefault();
        if (this.state.seed === students) {
            this.setState({
                seed: employees
            });
        } else {
            this.setState({
                seed: students
            });
        }
    }

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

    clearForm = event => {
        event.preventDefault();
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

    configureTableHeader() {
        const tableArray = Object.values(this.state.seed);
        const tableSample = Object.keys(tableArray[0]);
        let headers = [];
        tableSample.forEach( value => {  
            headers.push(
                <TableHeaderButton key={value} name={value} sortButton={this.sortButton}>
                    <Caret type={this.iconPicker(value)} />
                </TableHeaderButton>
            )
        })
        return headers;
    }   

    configureTableBody() {
        const tableArray = Object.values(this.state.seed);
        const tableFiltered = [];
        for (const item of tableArray) {
            if (Object.values(item).toString().toLowerCase().includes((this.state.filterBy).toLowerCase()) || !this.state.filterBy) {
                tableFiltered.push(item);
            }
        }
        const tableSorted = tableFiltered.sort(this.superSorter(this.state.sortBy, this.state.sortOrder));
        return (tableSorted);
    }

    sortButton = (thisSortBy) => {
        if (thisSortBy === this.state.sortBy) {
            if (this.state.sortOrder === "asc") {
                this.setState({ sortOrder: "desc" });
            } else {
                this.setState({ sortOrder: "asc" });
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
            return "caretDownFill"
        } else if (thisSortBy === this.state.sortBy) {
            return "caretUpFill"
        } else {
            return "caretDown"
        }
    }

    render() {
        return (
            <div className="container">
                <Header
                    formInput={this.state.formInput}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    clearForm={this.clearForm}
                    selectSeed={this.selectSeed}
                ></Header>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <TableHeader>
                            {this.configureTableHeader()}
                        </TableHeader>
                        <TableBody tableContents={this.configureTableBody()} />
                    </table>
                </div>
            </div>
        )
    }
}

export default AppContainer;
