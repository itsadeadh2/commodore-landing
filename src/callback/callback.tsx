import React, { Component } from 'react';

interface CallbackState {
    countdown: number;
}

class Callback extends Component<{}, CallbackState> {
    private timer: NodeJS.Timeout | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            countdown: 5, // Set the initial countdown value
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState((prevState) => ({
                countdown: prevState.countdown - 1,
            }), () => {
                if (this.state.countdown === 0) {
                    window.close();
                }
            });
        }, 1000); // Decrease the countdown by 1 every second
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer); // Clean up the timer on component unmount
        }
    }

    render() {
        return (
            <div className="terminal">
                <div className="header">
                    *** COMMODORE LANDING ***
                </div>
                <div className="header">
                    REACT APP SYSTEM 2024 @THIAGO BARBOSA
                </div>
                <br/>
                <div className="command-history">
                    Authentication successful!
                </div>
                <div className="command-history">
                    This page will close in {this.state.countdown} seconds
                </div>
            </div>
        );
    }
}

export default Callback;
