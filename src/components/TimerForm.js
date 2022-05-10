import { Component } from "react";

export default class TimerForm extends Component {

    state = {
        title: '',
        project: '',
        valid: {
            title: true,
            project: true,
        },
    }

    componentDidMount() {
        const { title, project } = this.props;

        this.setState({ title, project });
    };

    handleSubmitEdit = ({ target }) => {
        const { onSubmitEdit, id } = this.props;
        const { title, project } = this.state;
        let validTitle = true;
        let validProject = true;

        if (title.trim() !== '' && project.trim() !== '') {
            onSubmitEdit(id, title, project);
        } else {
            if (title.trim() === '') {
                validTitle = false;
            }
            if (project.trim() === '') {
                validProject = false;
            }
        }
        this.setState({
            valid: {
                title: validTitle,
                project: validProject,
            }
        });
    };

    handleCancelEdit = ({ target }) => {
        const { onCancelEdit, id } = this.props;

        onCancelEdit(id);
    };

    handleInputValueTitle = (event) => {
        this.setState({ 
            title: event.target.value
        });
    };

    handleInputValueProject = (event) => {
        this.setState({ 
            project: event.target.value
        });
    };

    render() {
        const { title, project, valid } = this.state;
        
        return (
            <div className="card">
                <div className="content">
                    <div className="ui form">
                        <div className={valid.title ? 'field' : 'field error'}>
                            <label>Title</label>
                            <input type="text" value={title} onChange={this.handleInputValueTitle} />
                        </div>
                        <div className={valid.project ? 'field' : 'field error'}>
                            <label>Project</label>
                            <input type="text" value={project} onChange={this.handleInputValueProject} />
                        </div>
                        
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button" onClick={this.handleSubmitEdit}>
                                Submit
                            </button>
                            <button className="ui basic red button" onClick={this.handleCancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}