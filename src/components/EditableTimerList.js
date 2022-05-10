import { Component } from "react";
import EditableTimer from "./EditableTimer";

export default class EditableTimerList extends Component {

    render() {
        const { timers } = this.props;

        return (
            <div className="ui centered cards">
                {timers.map(t => (
                   <EditableTimer 
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        project={t.project}
                        time={t.time}
                        running={t.running}
                        editing={t.editing}
                        {...this.props} />
                ))}
            </div>
        );
    }

}