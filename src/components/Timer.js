import { Component } from "react";
import TimerActionButton from "./TimerActionButton";

export default class Timer extends Component {

    handleEdit = ({ target }) => {
        const { onEdit, id, running } = this.props;

        if (!running) {
            onEdit(id);
        }
    };

    handleRemove = ({ target }) => {
        const { onRemove, id, running } = this.props;

        if (!running && window.confirm( 'Are you sure you want to delete this Timer?', )) {
            onRemove(id);
        }
    };

    render() {
        const { title, project, time, running } = this.props;

        return (
            <div className="card">
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta">{project}</div>
                    <h2 className="center aligned description">
                        {time}
                    </h2>
                    <div className="extra content">
                        <a onClick={this.handleEdit} className={running ? 'disabled' : ''}>
                            <span className="right floated edit icon">
                                <i className="edit icon" />
                            </span>
                        </a>
                        <a onClick={this.handleRemove} className={running ? 'disabled' : ''}>
                            <span className="right floated trash icon">
                                <i className="trash icon" />
                            </span>
                        </a>
                    </div>
                    <TimerActionButton {...this.props} />
                </div>
            </div>
        );
    }

}