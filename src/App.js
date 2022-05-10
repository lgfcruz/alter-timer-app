import { Component } from "react";
import TimersDashboard from "./components/TimersDashboard";
export default class App extends Component {

    render() {
        return (
        <div>
            <h1>Timers</h1>
            <hr />
            <TimersDashboard />
        </div>
        );
    }

}