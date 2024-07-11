import React, { Component, createRef, KeyboardEvent } from 'react';
import './terminal.css';
import ProgramsManager from './programsManager';
import Loading from './components/loading';
import TerminalHeader from './components/terminalHeader';
import CommandHistory from './components/commandHistory';
import TerminalInput from './components/terminalInput';

interface TerminalManagerState {
  inputText: string;
  executing: boolean;
  hasMounted: boolean;
  loading: boolean;
}

class TerminalManager extends Component<{}, TerminalManagerState> {
  private inputRef = createRef<HTMLInputElement>();
  private scrollableDivRef = createRef<HTMLDivElement>();
  private manager: ProgramsManager | null = null;

  state: TerminalManagerState = {
    inputText: '',
    executing: false,
    hasMounted: false,
    loading: false,
  };

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handleScroll);
    if (this.state.hasMounted) return;
    this.initializeManager();
  }

  async initializeManager() {
    this.manager = new ProgramsManager();
    const initialCommand = 'help';
    this.setState({ inputText: initialCommand });
    await this.manager.execute(initialCommand);
    this.setState({ inputText: '', hasMounted: true });
  }

  componentDidUpdate() {
    // Make the terminal scroll to the bottom after each update
    this.scrollByAmount(2000);
  }

  handleScroll = (event: WheelEvent) => {
    const { deltaY } = event;
    this.scrollByAmount(deltaY);
  };

  scrollByAmount = (amount: number) => {
    if (this.scrollableDivRef.current) {
      this.scrollableDivRef.current.scrollBy({ top: amount, behavior: 'auto' });
    }
  };

  handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === 'Enter') {
      if (this.state.executing) {
        event.preventDefault();
        return;
      }
      const originalText = this.state.inputText;
      this.setState({ executing: true, inputText: '', loading: true });
      await this.manager?.execute(originalText);
      this.setState({ executing: false, inputText: '', loading: false }, () => {
        this.inputRef.current?.focus();
      });
      event.preventDefault();
    } else if (key === 'Backspace') {
      this.setState((prevState) => ({ inputText: prevState.inputText.slice(0, -1) }));
      event.preventDefault();
    } else if (key.length === 1) {
      this.setState((prevState) => ({ inputText: prevState.inputText + key }));
      event.preventDefault();
    }

    // Prevent default action for keys we want to handle differently
    if (['Enter', 'Backspace', 'Alt', 'Delete', 'Meta', 'Control', 'Shift'].includes(key)) {
      event.preventDefault();
    }
  };

  render() {
    return (
        <div className="terminal" onClick={() => this.inputRef.current?.focus()}>
          <TerminalHeader />
          <div ref={this.scrollableDivRef} className="terminal-content">
            <br />
            <CommandHistory history={this.manager?.getHistory() ?? []} />
            {this.state.loading && <Loading isLoading={this.state.loading} />}
            <TerminalInput
                inputRef={this.inputRef}
                inputText={this.state.inputText}
                executing={this.state.executing}
                onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
    );
  }
}

export default TerminalManager;
