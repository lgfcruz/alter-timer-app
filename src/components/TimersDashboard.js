import { Component } from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";

import { timers } from '../seeds';

export default class TimersDashboard extends Component {

    state = {
        timers: [],
        counterInterval: null,
    }

    componentDidMount() {
        this.setState({ 
            timers,
            counterInterval: setInterval(() => {
                const { timers } = this.state;

                if (timers !== null && timers !== undefined && timers.length > 0) {
                    const newTimersState = timers.map(timer => {
                        if (timer.running) {
                            const splits = timer.time.split(":");
                            const option = {
                                hourCycle: 'h23',
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            };
                            const d = new Date();
                            d.setHours(splits[0]);
                            d.setMinutes(splits[1]);
                            d.setSeconds(splits[2], 0);                                
                            d.setTime(d.getTime() + 1000);
                            return {
                                ...timer,
                                time: d.toLocaleTimeString('en-US', option)
                            };
                        }
                        return timer;
                    });
            
                    this.setState({
                        timers: newTimersState
                    });
                }
            }, 1000)
        });
    }

    componentWillUnmount() {
        const { counterInterval } = this.state;
        clearInterval(counterInterval);
    }

    handleTimerEdit = (timerId) => {
        const { timers } = this.state;

        const newTimersState = timers.map(timer => {
            if (timer.id === timerId) {
                return {
                    ...timer,
                    editing: true
                };
            }
            return timer;
        });

        this.setState({
            timers: newTimersState
        });
    };

    handleTimerCancelEdit = (timerId) => {
        const { timers } = this.state;

        const newTimersState = timers.map(timer => {
            if (timer.id === timerId) {
                return {
                    ...timer,
                    editing: false,
                };
            }
            return timer;
        }).filter(timer => timer.id !== timerId || (timer.id === timerId && !timer.new));

        this.setState({
            timers: newTimersState
        });
    };

    handleTimerRemove = (timerId) => {
        const { timers } = this.state;

        const newTimersState = timers.filter(timer => timer.id !== timerId);

        this.setState({
            timers: newTimersState
        });
    };

    toggleExecute = (timerId) => {
        const { timers } = this.state;

        const newTimersState = timers.map(timer => {
            if (timer.id === timerId) {
                return {
                    ...timer,
                    running: !timer.running,
                };
            }
            return timer;
        });

        this.setState({
            timers: newTimersState
        });
    };

    handleTimerSubmitEdit = (timerId, title, project) => {
        const { timers } = this.state;

        const newTimersState = timers.map(timer => {
            if (timer.id === timerId) {
                return {
                    ...timer,
                    title,
                    project,
                    editing: false,
                    new: false,
                };
            }
            return timer;
        });

        this.setState({
            timers: newTimersState
        });
    };

    handleTimerCreate = () => {
        const { timers } = this.state;

        const maxTimerId = timers.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id)

        const newTimersState = timers;
        newTimersState.push({
            id: maxTimerId + 1,
            title: '',
            project: '',
            time: '00:00:00',
            running: false,
            editing: true,
            new: true,
        });

        this.setState({
            timers: newTimersState
        });
    };

    render() {
        const { timers } = this.state;

        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList
                        timers={timers}
                        onEdit={this.handleTimerEdit}
                        onCancelEdit={this.handleTimerCancelEdit}
                        onRemove={this.handleTimerRemove}
                        onToggleExecute={this.toggleExecute}
                        onSubmitEdit={this.handleTimerSubmitEdit} />
                    <ToggleableTimerForm 
                        onCreate={this.handleTimerCreate} />
                </div>
            </div>
        );
    }

}