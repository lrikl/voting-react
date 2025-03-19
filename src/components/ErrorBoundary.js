import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOk: true,
        };

    }

    componentDidCatch(error, errorInfo) {
        this.setState({ isOk: false });
    }

    render() {
        if(!this.state.isOk) {
            return <div>Ooops... something went wrong 😒</div>
        }

        return this.props.children;
    }

}