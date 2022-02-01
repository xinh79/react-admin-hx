import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "../store/actions";
import Layout from "../views/layout";
import Login from "../views/login";
class Router extends React.Component {
	render() {
		const { token, role, getUserInfo } = this.props;
		return (
			<HashRouter>
				<Routes>
					<Route exact path="/login" component={Login} />
					<Route
						path="/"
						render={() => {
							if (!token) {
								return <Navigate to="/login" />;
							} else {
								if (role) {
									return <Layout />;
								} else {
									getUserInfo(token).then(() => <Layout />);
								}
							}
						}}
					/>
				</Routes>
			</HashRouter>
		);
	}
}

export default connect((state) => state.user, { getUserInfo })(Router);
