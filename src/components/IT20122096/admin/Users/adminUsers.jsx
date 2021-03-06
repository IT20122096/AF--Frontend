import React, { Component } from "react";
import { getUsers } from "../../../../services/IT20122096/userServices";
import SideMenuList from "../../common/sideMenuList";
import Page from "../../common/pagination";
import StudentTable from "./studentTable";
import { getGroups } from "../../../../services/IT20122096/adminService";
import StaffTable from "./staffTable";
import SearchBar from "../../common/searchBar";

class AdminUsers extends Component {
  state = {
    groups: [],
    users: [],
    staff: [],
    userRoles: ["Student","Supervisor","Co-Supervisor","Pannel Member"],
    currentItem: "Student",
    currentPage: 1,
    pageSize: 3,
    itemCount: 0,
    searchResult: "",
  };

  async componentDidMount() {
    {
      const { data: users } = await getUsers();
      const { data: groups } = await getGroups();
      this.setState({ users, groups});
    }
  }
  handleSearch = (query) => {
    const {currentItem } = this.state;
    this.setState({
      currentPage: 1,
      searchResult: query,
      staff: [],
    });
    this.handleChange(currentItem);
  };

  handleChange = (item) => {
    const { users, searchResult } = this.state;
    this.setState({ currentPage: 1, currentItem: item });
    let staff = [];

    if (item === "Student") {
      this.setState({ itemCount: this.state.groups.length });
    }
    if (item === "Supervisor") {
      if (searchResult) {
        staff = users.filter(
          (user) =>
            user.userRole === "Supervisor" &&
            (user.email + "")
              .toLowerCase()
              .startsWith(searchResult.toLowerCase())
        );
        this.setState({ itemCount: staff.length, staff });
      } else {
        staff = users.filter((user) => user.userRole === "Supervisor");
        this.setState({ itemCount: staff.length, staff });
      }
    }
    if (item === "Co-Supervisor") {
      if (searchResult) {
        staff = users.filter(
          (user) =>
            user.userRole === "Co-Supervisor" &&
            (user.email + "")
              .toLowerCase()
              .startsWith(searchResult.toLowerCase())
        );
        this.setState({ itemCount: staff.length, staff });
      } else {
        staff = users.filter((user) => user.userRole === "Co-Supervisor");
        this.setState({ itemCount: staff.length, staff });
      }
    }
    if (item === "Pannel Member") {
      if (searchResult) {
        staff = users.filter(
          (user) =>
            user.userRole === "Pannel Member" &&
            (user.email + "")
              .toLowerCase()
              .startsWith(searchResult.toLowerCase())
        );
        this.setState({ itemCount: staff.length, staff });
      } else {
        staff = users.filter((user) => user.userRole === "Pannel Member");
        this.setState({ itemCount: staff.length, staff });
      }
    }
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <SideMenuList
          items={this.state.userRoles}
          currentItem={this.state.currentItem}
          onChange={this.handleChange}
          width="20rem"
        />
        <div className="container">
          {this.state.currentItem !== "Student" ? (
            <SearchBar
              onChange={this.handleSearch}
              placeholder="example@gmail.com"
            />
          ) : (
            <div></div>
          )}

          {this.state.currentItem === "Student" ? (
            <StudentTable currentPage={this.state.currentPage} />
          ) : this.state.staff.length > 0 ? (
            <StaffTable
              items={this.state.staff}
              currentItem={this.state.currentItem}
            />
          ) : (
            <center>
              <h2>Can't find user "{this.state.searchResult}"</h2>
            </center>
          )}
          {this.state.currentItem !== "Student" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
                marginRight: "5rem",
              }}
            >
              <Page
                itemCount={this.state.itemCount}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default AdminUsers;
