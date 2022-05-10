import { Component } from "react";
import Timer from "./Timer";
import TimerForm from "./TimerForm";

export default class EditableTimer extends Component {

    render() {
        const { editing } = this.props;
        
        if (editing) {
            return <TimerForm {...this.props} />;
        } else {
            return <Timer {...this.props} />;
        }
    }

}