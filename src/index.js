'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';


class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        emojiCounts: [0, 0, 0, 0, 0],
        emojis: ["😒", "😂", "😇", "😎", "🙄"], 
        showResults: false,
        flyingEmojis: [],
      };
    }
  
    emojiClick = (index, event) => {
        this.setState({ showResults: false }); 

        this.setState((prevState) => {
            const newEmojiCounts = [...prevState.emojiCounts]; 
            newEmojiCounts[index] = newEmojiCounts[index] + 1;
            return { emojiCounts: newEmojiCounts };
        });

        const rect = event.target.getBoundingClientRect();
        const randomOffset = (Math.random() - 0.8) * 40; // відхилення вліво/вправо
        const x = rect.left + rect.width / 2 + randomOffset;
        const y = rect.top; 

        const emojiId = Date.now(); 

        this.setState((prevState) => ({
            flyingEmojis: [
                ...prevState.flyingEmojis,
                { id: emojiId, emoji: this.state.emojis[index], x, y },
            ],
        }));

        setTimeout(() => {
            this.setState((prevState) => ({
                flyingEmojis: prevState.flyingEmojis.filter((e) => e.id !== emojiId),
            }));
        }, 1500);
    };
 
    showResults = () => {
        this.setState({ showResults: true }); 
    };

    getMaxCount = () => {
        return Math.max(...this.state.emojiCounts);
    };
    
    getWinningEmojiIndex = () => {
        const maxCount = this.getMaxCount();
        return this.state.emojiCounts.indexOf(maxCount);
    };

    clearReults = () => {
        this.setState((prevState) => ({
            emojiCounts: prevState.emojiCounts.map(() => 0),
            showResults: false
        }));
    };
  
    render() {
        const winningIndex = this.getWinningEmojiIndex();

        return (
            <div className="emoji-block">

                <h1>Голосування за найкращий смайлик</h1>

                <ul className="emoji-list">
                    {this.state.emojis.map((emoji, index) => (
                    <li className="emoji-item" key={index}>
                        <span className="emoji" onClick={(event) => this.emojiClick(index, event)}>
                            {emoji}
                        </span>
                        {this.state.showResults && (
                            <span className="click-counter">
                                {this.state.emojiCounts[index]}
                            </span>
                        )}
                    </li>
                    ))}
                </ul>

                <div className="btn-wrap">
                    <button className="btn btn-show" onClick={this.showResults}>Show Results</button>
                    <button className="btn btn-clear" onClick={this.clearReults}>Clear</button>
                </div>

                {this.state.showResults && (
                    this.getMaxCount() === 0 ? (
                        <div className='results-block'>
                            <h2>Треба за когось проголосувати</h2>
                        </div>
                    ) : (
                        <div className='results-block'>
                            <h2>Результати Голосування</h2>
                            <h3>Переможець:</h3>
                            <div className="emoji-item" key={winningIndex}>
                                <div className="emoji">
                                    {this.state.emojis[winningIndex]}
                                </div>
                                <div className="click-counter">
                                    Кількість голосів: {this.getMaxCount()}
                                </div>
                            </div>
                        </div>
                    )
                )}

                {this.state.flyingEmojis.map((emoji) => (
                    <span
                        key={emoji.id}
                        className="flying-emoji"
                        style={{ left: emoji.x, top: emoji.y }}
                    >
                        {emoji.emoji}
                    </span>
                ))}

            </div>
        );
    }
}

const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(<Main/>);