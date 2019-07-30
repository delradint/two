import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class List extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	onClickDelete = id => {
		this.props.deleteItem(id);
	};

	render() {
		const { items } = this.props.item;
		return (
			<div>
				<ListGroup>
					<TransitionGroup className="list">
						{items.map(item => (
							<CSSTransition key={item._id} timeout={1000} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={this.onClickDelete.bind(this, item._id)}
									>
										DELETE
									</Button>
									{item.name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
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
	{ getItems, deleteItem }
)(List);
