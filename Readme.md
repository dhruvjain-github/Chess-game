# ♟️ Chess Game

A real-time chess game built with **Node.js**, **Socket.io**, and **Chess.js**. Play with friends in a simple, responsive interface and enjoy real-time updates on your chessboard.

## 🚀 Features

- 🎮 Play chess with friends in real-time
- ⚔️ Validates moves using **Chess.js** (correct chess rules are enforced)
- 🔄 Automatically updates the board for all players
- 👀 Spectator mode for users who join once both players are already connected
- ♜ Flips the board for the black player

## 🛠️ Technologies Used

- **Backend**: Node.js, Express, Socket.io, Chess.js
- **Frontend**: HTML, CSS, JavaScript, Socket.io-client
- **Views**: EJS (Embedded JavaScript templates)

## 📦 Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/chess-game.git
    cd chess-game
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the server:**

    ```bash
    npm start
    ```

4. Open your browser and visit `http://localhost:3000` to play the game.

## 🎮 How to Play

- Two players can play against each other. 
- The first player to connect will be assigned the **white pieces**, and the second player will be assigned the **black pieces**.
- Any additional connections will result in **spectator mode**.
- Drag and drop pieces to make a move. Only valid moves are allowed.

## 📝 Game Rules

- This chess game follows standard **chess rules**.
- Players take turns moving pieces.
- The game ends when there is a **checkmate**, **stalemate**, or **draw**.

## 📂 Project Structure

```plaintext
chess-game/
│
├── public/                # Frontend assets (CSS, JS)
│   ├── main.js            # Frontend logic
│   └── styles.css         # Chessboard styling
│
├── views/                 # EJS templates
│   └── index.ejs          # Main game interface
│
├── app.js                 # Backend server and Socket.io logic
├── package.json           # Node.js dependencies and scripts
├── README.md              # Project documentation (this file)
└── .gitignore             # Files to ignore in Git
