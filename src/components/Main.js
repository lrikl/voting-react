'use strict';

import React, { useState } from 'react';

export default function Main()  {
    const emojis = ["😒", "😂", "😇", "😎", "🙄"];

    const [emojiCounts, setEmojiCounts] = useState(JSON.parse(localStorage.getItem('emojiCountsYar')) || [0, 0, 0, 0, 0]);
    const [showResults, setShowResults] = useState(false);
    const [flyingEmojis, setFlyingEmojis] = useState([]);

    function emojiClick(index, event) {
        setEmojiCounts((prevCounts) => {
            const newEmojiCounts = [...prevCounts];
            newEmojiCounts[index] += 1;
            localStorage.setItem('emojiCountsYar', JSON.stringify(newEmojiCounts));
            return newEmojiCounts;
        });
        
        setShowResults(false);

        // анімація кліків emoji
        const rect = event.target.getBoundingClientRect();
        const randomOffset = (Math.random() - 0.8) * 40; 
        const x = rect.left + rect.width / 2 + randomOffset;
        const y = rect.top; 

        const emojiId = Date.now();

        setFlyingEmojis((prev) => [...prev, { id: emojiId, emoji: emojis[index], x, y }]);

        setTimeout(() => {
            setFlyingEmojis((prev) => prev.filter((e) => e.id !== emojiId));
        }, 1500);
    };

    function showResultsHandler() {
        setShowResults(true); 
    };

    function getMaxCount() {
        return Math.max(...emojiCounts);
    };

    function getWinningEmojiIndex() {
        const maxCount = getMaxCount();
        return emojiCounts.indexOf(maxCount);
    };

    function clearResults() {
        const clearedEmojiCounts = emojiCounts.map(() => 0);
        localStorage.setItem('emojiCountsYar', JSON.stringify(clearedEmojiCounts));
        setEmojiCounts(clearedEmojiCounts);
        setShowResults(false);
    };

    return (
        <div className="emoji-block">
            <h1>Голосування за найкращий смайлик</h1>

            <ul className="emoji-list">
                {emojis.map((emoji, index) => (
                    <li className="emoji-item" key={index}>
                        <span className="emoji" onClick={(event) => emojiClick(index, event)}>
                            {emoji}
                        </span>
                        {showResults && (
                            <span className="click-counter">
                                {emojiCounts[index]}
                            </span>
                        )}
                    </li>
                ))}
            </ul>

            <div className="btn-wrap">
                <button className="btn btn-show" onClick={showResultsHandler}>Show Results</button>
                <button className="btn btn-clear" onClick={clearResults}>Clear</button>
            </div>

            {showResults && (
                getMaxCount() === 0 ? (
                    <div className='results-block'>
                        <h2>Треба за когось проголосувати</h2>
                    </div>
                ) : (
                    <div className='results-block'>
                        <h2>Результати Голосування</h2>
                        <h3>Переможець:</h3>
                        <div className="emoji-item" key={getWinningEmojiIndex()}>
                            <div className="emoji">
                                {emojis[getWinningEmojiIndex()]}
                            </div>
                            <div className="click-counter">
                                Кількість голосів: {getMaxCount()}
                            </div>
                        </div>
                    </div>
                )
            )}

            {flyingEmojis.map((emoji) => (
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
};


// class Component

// export default class Main_ extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             emojiCounts: JSON.parse(localStorage.getItem('emojiCountsYar')) || [0, 0, 0, 0, 0],
//             emojis: ["😒", "😂", "😇", "😎", "🙄"], 
//             showResults: false,
//             flyingEmojis: [],
//         };
//     }
  
//     emojiClick = (index, event) => {

//         this.setState((prevState) => {
//             const newEmojiCounts = [...prevState.emojiCounts]; 
//             newEmojiCounts[index] = newEmojiCounts[index] + 1;
//             localStorage.setItem('emojiCountsYar', JSON.stringify(newEmojiCounts));
//             return { 
//                 emojiCounts: newEmojiCounts,
//                 showResults: false
//             };
//         });

//         // анімація кліків emoji
//         const rect = event.target.getBoundingClientRect();
//         const randomOffset = (Math.random() - 0.8) * 40; 
//         const x = rect.left + rect.width / 2 + randomOffset;
//         const y = rect.top; 

//         const emojiId = Date.now(); 

//         this.setState((prevState) => ({
//             flyingEmojis: [
//                 ...prevState.flyingEmojis,
//                 { id: emojiId, emoji: this.state.emojis[index], x, y },
//             ],
//         }));

//         setTimeout(() => {
//             this.setState((prevState) => ({
//                 flyingEmojis: prevState.flyingEmojis.filter((e) => e.id !== emojiId),
//             }));
//         }, 1500);
//     };
 
//     showResults = () => {
//         this.setState({ showResults: true }); 
//     };

//     getMaxCount = () => {
//         return Math.max(...this.state.emojiCounts);
//     };
    
//     getWinningEmojiIndex = () => {
//         const maxCount = this.getMaxCount();
//         return this.state.emojiCounts.indexOf(maxCount);
//     };

//     clearResults = () => {
//         this.setState((prevState) => {
//           const clearedEmojiCounts = prevState.emojiCounts.map(() => 0);
//           localStorage.setItem('emojiCountsYar', JSON.stringify(clearedEmojiCounts));
      
//           return {
//             emojiCounts: clearedEmojiCounts, 
//             showResults: false,
//           };
//         });
//     };
  
//     render() {
//         const winningIndex = this.getWinningEmojiIndex();

//         return (
//             <div className="emoji-block">

//                 <h1>Голосування за найкращий смайлик</h1>

//                 <ul className="emoji-list">
//                     {this.state.emojis.map((emoji, index) => (
//                     <li className="emoji-item" key={index}>
//                         <span className="emoji" onClick={(event) => this.emojiClick(index, event)}>
//                             {emoji}
//                         </span>
//                         {this.state.showResults && (
//                             <span className="click-counter">
//                                 {this.state.emojiCounts[index]}
//                             </span>
//                         )}
//                     </li>
//                     ))}
//                 </ul>

//                 <div className="btn-wrap">
//                     <button className="btn btn-show" onClick={this.showResults}>Show Results</button>
//                     <button className="btn btn-clear" onClick={this.clearResults}>Clear</button>
//                 </div>

//                 {this.state.showResults && (
//                     this.getMaxCount() === 0 ? (
//                         <div className='results-block'>
//                             <h2>Треба за когось проголосувати</h2>
//                         </div>
//                     ) : (
//                         <div className='results-block'>
//                             <h2>Результати Голосування</h2>
//                             <h3>Переможець:</h3>
//                             <div className="emoji-item" key={winningIndex}>
//                                 <div className="emoji">
//                                     {this.state.emojis[winningIndex]}
//                                 </div>
//                                 <div className="click-counter">
//                                     Кількість голосів: {this.getMaxCount()}
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 )}

//                 {this.state.flyingEmojis.map((emoji) => (
//                     <span
//                         key={emoji.id}
//                         className="flying-emoji"
//                         style={{ left: emoji.x, top: emoji.y }}
//                     >
//                         {emoji.emoji}
//                     </span>
//                 ))}

//             </div>
//         );
//     }
// }