// import React, {useState, useEffect} from 'react'
// import update from 'immutability-helper'
// import io from 'socket.io-client'

// const socket = io.connect('http://localhost:4000')

// export default class ChatWithAgent extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             messList: {
//                 name: "",
//                 message: "",
//             },
//             chat: [],
//         }
//     }

//     onNameChange(e) {
//         this.setState({
//             messList: update (this.state.messList, {
//                 name: {$set: e.target.value},
//             })
//         })
//     }

//     onMessageChange(e) {
//         this.setState({
//             messList: update (this.state.messList, {
//                 message: {$set: e.target.value}
//             })
//         })
//     }

//     onMessageSubmit(e) {
//         e.preventDefault()
//         const name = this.state.messList.name
//         const message = this.state.messList.message

//         socket.emit('message', {name, message})
        
//         this.setState({
//             messList: update (this.state.messList, {
//                 message: {$set: ""}
//             })
//         })
//     }

//     renderChat() {
//         const chat = this.state.chat;

//         return chat.map(({name, message}, index) => (
//             <div key={index}>
//                 <h3>{name}: <span>{message}</span></h3>
//             </div>
//         ))
//     }

//     componentDidMount() {
//         var self = this;

//         socket.on('message', ({name, message}) => {
//             self.setState({
//                 chat: update(
//                     self.state.chat, {$push: [{name, message}]}
//                 )
//             })
//         })
//     }

//     render() {
//         const name = this.state.messList.name
//         const message = this.state.messList.message

//         console.log(this.state.messList)
//         console.log(this.state.chat)

//         const chatLog = this.renderChat()

//         return (
//             <div>
//                 <form onSubmit={this.onMessageSubmit.bind(this)}>
//                     <div className="row">
//                         <div className="form-group">
//                             <label>Name Below:</label>
//                             <input type="text" className="form-control" placeholder="Enter a message" onChange={this.onNameChange.bind(this)} value={name}/>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="form-group">
//                             <label>Message Below:</label>
//                             <input type="text" className="form-control" placeholder="Enter a message" onChange={this.onMessageChange.bind(this)} value={message}/>
//                         </div>
//                     </div>
//                     <button>Send Message</button>
//                 </form>

//                 <div>
//                     CHATT!!!
//                     {chatLog}
//                 </div>
//             </div>
//         )
//     }
// }