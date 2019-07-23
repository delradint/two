import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

class List extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	render() {
		const { items } = this.props.item;
		return (
			<div>
				<Container>
					{/* <Button color="dark" style={{ marginBottom: "2rem" }}>
						ADD
					</Button> */}
					<ListGroup>
						<TransitionGroup className="list">
							{items.map(item => (
								<CSSTransition key={item.id} timeout={1000} classNames="fade">
									<ListGroupItem>
										<Button
											className="remove-btn"
											color="danger"
											size="sm"
											onClick={() => {
												this.setState(state => ({
													items: state.items.filter(i => i.id !== item.id)
												}));
											}}
										>
											DELETE
										</Button>
										{item.name}
									</ListGroupItem>
								</CSSTransition>
							))}
						</TransitionGroup>
					</ListGroup>
				</Container>
			</div>
		);
	}
}

List.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ getItems }
)(List);
