import React, { Component, ReactElement, createRef, KeyboardEvent } from 'react';
import './terminal.css';
import ProgramsManager from './programsManager';

interface TerminalManagerState {
  inputText: string;
  executing: boolean;
  hasMounted: boolean;
}

class TerminalManager extends Component<{}, TerminalManagerState> {
  private inputRef = createRef<HTMLInputElement>();
  private scrollableDivRef = createRef<HTMLDivElement>();
  private manager: ProgramsManager | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      inputText: '',
      executing: false,
      hasMounted: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollByAmount = this.scrollByAmount.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  }

  async componentDidMount() {
    window.addEventListener('wheel', this.handleScroll);
    if (this.state.hasMounted) return;
    this.manager = new ProgramsManager();
    const initialCommand = 'help';
    this.setState({ inputText: initialCommand });
    this.inputRef.current?.focus();
    await this.manager.execute(initialCommand);
    this.setState({ inputText: '', hasMounted: true });
  }

  handleScroll = (event: WheelEvent) => {
    const { deltaY } = event;
    this.scrollByAmount(deltaY)
  }
  scrollByAmount = (amount: number) => {
    if (this.scrollableDivRef.current) {
      this.scrollableDivRef.current.scrollBy({ top: amount, behavior: 'auto' });
    }
  };

  handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Process the command and get the response
      if (this.state.executing) {
        event.preventDefault();
        return;
      }
      this.setState({ executing: true });
      const originalText = this.state.inputText;
      this.setState({ inputText: '' });
      await this.manager?.execute(originalText);
      this.setState({ executing: false, inputText: '' });
      event.preventDefault();
    } else if (event.key === 'Backspace') {
      this.setState({ inputText: this.state.inputText.slice(0, -1) });
      event.preventDefault();
    } else if (event.key.length === 1) {
      this.setState({ inputText: this.state.inputText + event.key });
      event.preventDefault();
    }

    // Prevent default action for keys we want to handle differently
    if (['Enter', 'Backspace', 'Alt', 'Delete', 'Meta', 'Control', 'Shift'].includes(event.key)) {
      event.preventDefault();
    }
  };

  render() {
    return (
        <div className="terminal" onClick={() => this.inputRef.current?.focus()}>
          <div className="header">
            ***   COMMODORE LANDING   ***
          </div>
          <div className="header">
            REACT APP SYSTEM  2024 @THIAGO BARBOSA
          </div>
          <div ref={this.scrollableDivRef} className="terminal-content">
            <br />
            {this.manager?.getHistory().map((entry: string | ReactElement, index: number) => (
                <div key={index} className="command-history">
                  {entry}
                </div>
            ))}
            <div>
              &gt; {this.state.inputText}<span className="blinking-cursor"></span>
            </div>
            <input
                type="text"
                className="hidden-input"
                ref={this.inputRef}
                value=""
                onKeyDown={this.handleKeyPress}
                onChange={() => {}} // Prevent React warning
            />
          </div>
        </div>
    );
  }
}

export default TerminalManager;
