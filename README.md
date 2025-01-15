# MusicBuddy

MusicBuddy is a fully responsive online web application designed for seamless music playback. The platform offers an interactive and user-friendly interface, enabling users to enjoy their favorite songs with ease.

## Features

- **Dynamic Playback Controls**: Play, Next, Previous, and Volume buttons for convenient music control.
- **Real-Time Updates**: Displays dynamic song names, time, and duration.
- **Interactive Seek Bar**: Allows users to navigate through tracks effortlessly.
- **Automatic Song Listing**: Automatically generates song cards with cover images, titles, and descriptions based on folder contents in JSON format.
- **Folder-Based Song Addition**: Users can add new songs by creating folders with songs, a JSON file, and a cover image.
- **Fetch API Integration**: Utilizes the Fetch API for seamless content loading.
- **Responsive Design**: Optimized for different screen sizes and devices.
- **Deployment Ready**: Fully deployed and ready for live usage.

## How It Works

1. **Song Cards**: Each song card is automatically created based on the JSON file in the folder.
   - JSON includes metadata like title, description, and cover image.
2. **Loading Songs**: Songs load dynamically when a card is clicked.
3. **Adding New Songs**: Add a folder with:
   - Song files.
   - A `JSON` file containing metadata.
   - A cover image.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **API**: Fetch API
  
## Usage

1. Add a folder containing songs, a JSON file, and a cover image.
2. The application will automatically create a song card for each entry.
3. Click on any song card to start playback.
4. Use the playback controls and seek bar for a customized listening experience.

