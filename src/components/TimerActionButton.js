import { Component } from "react";

export default class TimerActionButton extends Component {

    toggleStartStop = ({ target }) => {
        const { onToggleExecute, id } = this.props;

        onToggleExecute(id);
    };

    render() {
        const { running } = this.props;
        return (
            <>
            {running ? (
                <div className="ui bottom attached red basic button" onClick={this.toggleStartStop}>
                    Stop
                </div>
            ) : (
                <div className="ui bottom attached green basic button" onClick={this.toggleStartStop}>
                    Start
                </div>
            )}
            </>
        );
    }

}