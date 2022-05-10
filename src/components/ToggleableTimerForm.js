import { Component } from "react";

export default class ToggleableTimerForm extends Component {

    handleNew = ({ target }) => {
        const { onCreate } = this.props;

        onCreate();
    };

    render() {
        return (
            <div className="ui basic content center aligned segment" onClick={this.handleNew}>
                <button className="ui basic button icon">
                    <i className="plus icon" />
                </button>
            </div>
        );
    }

}