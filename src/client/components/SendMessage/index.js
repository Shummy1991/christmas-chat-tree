import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { sendMessage } from "../../../common/store/communication/actions";

const Form = styled.form`
  position: absolute;
  bottom: 10px;
  left: 400px;
  right: 400px;
  display: flex;
`;

const InputText = styled.input`
  font-size: 22px;
  font-family: inherit;
  border-radius: 10px;
  height: 50px;
  padding: 0 12px;
  flex: 1;
`;

const Button = styled.button`
  background-color: rgba(49, 42, 102, 1);
  color: white;
  border-radius: 10px;
  padding: 0 20px;
  font-size: 25px;
  border: none;
  font-family: inherit;
  margin-left: 12px;
  cursor: pointer;
`;

class SendMessage extends React.Component {
  state = {
      message: "",
  }
  onChange = ({ target: { value }}) => this.setState({ message: value })

  sendMessage = e => {
      e.preventDefault();
      const { message } = this.state;
      if (!message) return;
      this.props.sendMessage({ message });
      this.setState({ message: "" });
  }
  render() {
      const { message } = this.state;
      return (
          <Form onSubmit={this.sendMessage}>
              <InputText placeholder="Enter your message here..." maxLength={60} value={message} onChange={this.onChange}/>
              <Button type="submit">Send</Button>
          </Form>
      );
  }
}

export default connect(null, { sendMessage })(SendMessage);
