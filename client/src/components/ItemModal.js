import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input
} from "reactstrap";
import { connect } from "react-redux";
import uuid from "uuid";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			name: ""
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();

		const newItem = {
			id: uuid(),
			name: this.state.name
		};

		this.props.addItem(newItem);

		this.toggle();
	};

	render() {
		return (
			<div>
				<Button
					color="dark"
					style={{ marginBottom: "2rem" }}
					onClick={this.toggle.bind(this)}
				>
					ADD
				</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to list</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input
									type="text"
									name="name"
									id="item"
									placeholder="Add item"
									onChange={this.onChange}
								/>
								<Button color="dark" style={{ marginTop: "2rem" }} block>
									ADD
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item
});

export default connect(
	mapStateToProps,
	{ addItem }
)(ItemModal);
